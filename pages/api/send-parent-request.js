import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Only POST allowed' });
  }

  const { roblosecurity, parentEmail } = req.body;

  if (!roblosecurity || !parentEmail) {
    return res.status(400).json({ status: 'error', message: 'Missing cookie or email' });
  }

  try {
    // Step 1: Get the user ID
    const userResp = await fetch('https://users.roblox.com/v1/users/authenticated', {
      headers: {
        Cookie: `.ROBLOSECURITY=${roblosecurity}`,
      },
    });

    if (!userResp.ok) {
      const err = await userResp.json();
      return res.status(userResp.status).json({ status: 'error', message: err.message || 'Invalid cookie' });
    }

    const userData = await userResp.json();
    const userId = userData.id;

    // Step 2: Trigger CSRF token fetch
    let csrfToken = '';
    const csrfResp = await fetch('https://apis.roblox.com/child-requests-api/v1/send-request-to-new-parent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `.ROBLOSECURITY=${roblosecurity}`,
      },
    });

    if (csrfResp.status === 403 && csrfResp.headers.get('x-csrf-token')) {
      csrfToken = csrfResp.headers.get('x-csrf-token');
    } else {
      return res.status(500).json({ status: 'error', message: 'Failed to get CSRF token' });
    }

    // Step 3: Send the actual parent request
    const finalResp = await fetch('https://apis.roblox.com/child-requests-api/v1/send-request-to-new-parent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
        Cookie: `.ROBLOSECURITY=${roblosecurity}`,
      },
      body: JSON.stringify({
        childUser Id: userId,  // Corrected line
        newParentEmail: parentEmail,
      }),
    });

    const finalData = await finalResp.json();

    if (!finalResp.ok) {
      return res.status(finalResp.status).json({
        status: 'error',
        message: finalData.message || 'Request failed',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Parent request sent successfully',
      robloxResponse: finalData,
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ status: 'error', message: 'Unexpected error occurred' });
  }
}
