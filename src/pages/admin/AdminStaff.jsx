import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminTopbar from '../../components/admin/AdminTopbar';

const AdminStaff = ({ userData, onLogout }) => {
  const [staff, setStaff] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');

  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    department: '',
    role: '',
    phone: '',
    joinDate: ''
  });

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      // Demo data
      const demoStaff = [
        {
          id: 1,
          name: 'Dr. Rajesh Sharma',
          email: 'r.sharma@college.edu',
          department: 'Computer Science',
          role: 'Professor',
          status: 'active',
          joinDate: '2023-01-15',
          phone: '+91 9876543210',
          lastActive: '2024-01-20',
          courses: ['Data Structures', 'Algorithms'],
          avatar: 'RS'
        },
        {
          id: 2,
          name: 'Ms. Priya Patel',
          email: 'p.patel@college.edu',
          department: 'Administration',
          role: 'Coordinator',
          status: 'active',
          joinDate: '2023-03-20',
          phone: '+91 9876543211',
          lastActive: '2024-01-19',
          courses: ['Administration'],
          avatar: 'PP'
        },
        {
          id: 3,
          name: 'Mr. Amit Verma',
          email: 'a.verma@college.edu',
          department: 'Examination',
          role: 'Officer',
          status: 'inactive',
          joinDate: '2022-11-10',
          phone: '+91 9876543212',
          lastActive: '2024-01-10',
          courses: ['Exam Coordination'],
          avatar: 'AV'
        }
      ];
      setStaff(demoStaff);
    } finally {
      setLoading(false);
    }
  };

  const departments = [
    'Computer Science',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Administration',
    'Examination',
    'Library',
    'Hostel',
    'Finance'
  ];

  const roles = [
    'Professor',
    'Assistant Professor',
    'Coordinator',
    'Officer',
    'Librarian',
    'Administrator',
    'Support Staff'
  ];

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-red-100 text-red-800 border-red-200';
  };

  const getDepartmentColor = (dept) => {
    const colors = {
      'Computer Science': 'bg-blue-100 text-blue-800',
      'Mathematics': 'bg-purple-100 text-purple-800',
      'Physics': 'bg-orange-100 text-orange-800',
      'Chemistry': 'bg-green-100 text-green-800',
      'Administration': 'bg-gray-100 text-gray-800',
      'Examination': 'bg-yellow-100 text-yellow-800',
      'Library': 'bg-indigo-100 text-indigo-800',
      'Hostel': 'bg-pink-100 text-pink-800',
      'Finance': 'bg-teal-100 text-teal-800'
    };
    return colors[dept] || 'bg-gray-100 text-gray-800';
  };

  const handleAddStaff = () => {
    const newStaffMember = {
      id: staff.length + 1,
      ...newStaff,
      status: 'active',
      avatar: newStaff.name.split(' ').map(n => n[0]).join(''),
      lastActive: new Date().toISOString().split('T')[0],
      courses: [newStaff.role]
    };
    
    setStaff(prev => [...prev, newStaffMember]);
    setShowAddModal(false);
    setNewStaff({
      name: '',
      email: '',
      department: '',
      role: '',
      phone: '',
      joinDate: ''
    });
  };

  const handleEditStaff = () => {
    if (!selectedStaff) return;
    
    setStaff(prev => prev.map(staff => 
      staff.id === selectedStaff.id 
        ? { ...selectedStaff, avatar: selectedStaff.name.split(' ').map(n => n[0]).join('') }
        : staff
    ));
    setShowEditModal(false);
    setSelectedStaff(null);
  };

  const handleDeleteStaff = (staffId) => {
    if (!window.confirm('Are you sure you want to delete this staff member?')) return;
    setStaff(prev => prev.filter(staff => staff.id !== staffId));
  };

  const toggleStaffStatus = (staffId) => {
    setStaff(prev => prev.map(staff => 
      staff.id === staffId 
        ? { ...staff, status: staff.status === 'active' ? 'inactive' : 'active' }
        : staff
    ));
  };

  const filteredStaff = staff.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || staff.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const stats = {
    total: staff.length,
    active: staff.filter(s => s.status === 'active').length,
    departments: [...new Set(staff.map(s => s.department))].length,
    newThisMonth: staff.filter(s => {
      const joinDate = new Date(s.joinDate);
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      return joinDate.getMonth() === currentMonth && joinDate.getFullYear() === currentYear;
    }).length
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar activePage="staff" onLogout={onLogout} />
      
      <div className="flex-1 flex flex-col ml-64">
        <AdminTopbar 
          userData={userData} 
          onLogout={onLogout} 
          title="Staff Management" 
          subtitle="Manage faculty and staff members"
        />
        
        <div className="flex-1 p-6">
          {/* Header with Actions */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Staff Members</h2>
              <p className="text-gray-600">Manage all faculty and administrative staff</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-linear-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white py-2 px-6 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-lg"
            >
              <i className="fas fa-user-plus"></i>
              Add New Staff
            </button>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    placeholder="Search staff by name, email, or department..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="lg:w-64">
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Staff</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <i className="fas fa-users text-white text-lg"></i>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Staff</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stats.active}</p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <i className="fas fa-user-check text-white text-lg"></i>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Departments</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stats.departments}</p>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <i className="fas fa-building text-white text-lg"></i>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">New This Month</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stats.newThisMonth}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <i className="fas fa-user-plus text-white text-lg"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Staff Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Staff Member
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department & Role
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Join Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStaff.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-linearto-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                            {member.avatar}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{member.name}</div>
                            <div className="text-sm text-gray-500">{member.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{member.phone}</div>
                        <div className="text-sm text-gray-500">Last active: {member.lastActive}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${getDepartmentColor(member.department)}`}>
                            {member.department}
                          </span>
                          <div className="text-sm text-gray-900">{member.role}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(member.status)}`}>
                            {member.status}
                          </span>
                          <button 
                            onClick={() => toggleStaffStatus(member.id)}
                            className={`w-8 h-4 rounded-full transition-colors duration-200 ${
                              member.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          >
                            <div className={`w-3 h-3 bg-white rounded-full transform transition-transform duration-200 ${
                              member.status === 'active' ? 'translate-x-4' : 'translate-x-1'
                            }`}></div>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {member.joinDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button 
                            className="text-blue-600 hover:text-blue-900 transition-colors duration-200 p-2 rounded-lg hover:bg-blue-50"
                            onClick={() => {
                              setSelectedStaff(member);
                              setShowEditModal(true);
                            }}
                            title="Edit"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button 
                            className="text-green-600 hover:text-green-900 transition-colors duration-200 p-2 rounded-lg hover:bg-green-50"
                            title="View Profile"
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-900 transition-colors duration-200 p-2 rounded-lg hover:bg-red-50"
                            onClick={() => handleDeleteStaff(member.id)}
                            title="Delete"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredStaff.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <i className="fas fa-users text-4xl mb-4 opacity-40"></i>
                <p className="text-lg">No staff members found</p>
                <p className="text-sm">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Add New Staff Member</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={newStaff.department}
                    onChange={(e) => setNewStaff({...newStaff, department: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <select
                    value={newStaff.role}
                    onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Role</option>
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={newStaff.phone}
                    onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
                  <input
                    type="date"
                    value={newStaff.joinDate}
                    onChange={(e) => setNewStaff({...newStaff, joinDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddStaff}
                disabled={!newStaff.name || !newStaff.email || !newStaff.department || !newStaff.role}
                className="bg-linear-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white py-2 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Staff Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Staff Modal */}
      {showEditModal && selectedStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Edit Staff Member</h2>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={selectedStaff.name}
                  onChange={(e) => setSelectedStaff({...selectedStaff, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={selectedStaff.email}
                  onChange={(e) => setSelectedStaff({...selectedStaff, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={selectedStaff.department}
                    onChange={(e) => setSelectedStaff({...selectedStaff, department: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <select
                    value={selectedStaff.role}
                    onChange={(e) => setSelectedStaff({...selectedStaff, role: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={selectedStaff.phone}
                    onChange={(e) => setSelectedStaff({...selectedStaff, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={selectedStaff.status}
                    onChange={(e) => setSelectedStaff({...selectedStaff, status: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button 
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Cancel
              </button>
              <button 
                onClick={handleEditStaff}
                className="bg-linear-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Update Staff
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStaff;