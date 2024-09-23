import UserList from '../../components/UserList';

export default function Users() {
  const users = [{ id: 1, name: 'John Doe' }]; // Example data

  return <UserList users={users} />;
}
