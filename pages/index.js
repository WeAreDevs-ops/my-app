// pages/index.js
import ParentRequestForm from '../components/ParentRequestForm';

export default function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Send Parent Request</h1>
      <ParentRequestForm />
    </div>
  );
}
