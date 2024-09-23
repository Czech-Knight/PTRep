const ActivityLog = ({ logs }) => (
    <ul>
      {logs.map(log => (
        <li key={log.id}>{log.action}</li>
      ))}
    </ul>
  );
  
  export default ActivityLog;
  