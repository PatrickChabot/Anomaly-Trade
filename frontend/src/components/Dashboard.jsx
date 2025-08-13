function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Portfolio</h2>
            <p className="text-gray-600">Your trading portfolio will appear here</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Recent Trades</h2>
            <p className="text-gray-600">Your recent trades will appear here</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Account</h2>
            <p className="text-gray-600">Account information will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;