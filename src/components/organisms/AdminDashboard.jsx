import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import Loading from "@/components/ui/Loading";
import ErrorView from "@/components/ui/ErrorView";
import Empty from "@/components/ui/Empty";
import { leadService } from "@/services/api/leadService";

const AdminDashboard = ({ onClose }) => {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [leadsResult, statsResult] = await Promise.all([
        leadService.getAll(),
        leadService.getStats()
      ]);
      setLeads(leadsResult);
      setStats(statsResult);
    } catch (err) {
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      await leadService.update(leadId, { status: newStatus });
      setLeads(prev => prev.map(lead => 
        lead.Id === leadId ? { ...lead, status: newStatus } : lead
      ));
      toast.success("Lead status updated successfully");
      loadData(); // Refresh stats
    } catch (error) {
      toast.error("Failed to update lead status");
    }
  };

  const handleDeleteLead = async (leadId) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        await leadService.delete(leadId);
        setLeads(prev => prev.filter(lead => lead.Id !== leadId));
        toast.success("Lead deleted successfully");
        loadData(); // Refresh stats
      } catch (error) {
        toast.error("Failed to delete lead");
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "New": return "bg-info/10 text-info border-info/20";
      case "In Progress": return "bg-warning/10 text-warning border-warning/20";
      case "Resolved": return "bg-success/10 text-success border-success/20";
      default: return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const statusOptions = [
    { value: "New", label: "New" },
    { value: "In Progress", label: "In Progress" },
    { value: "Resolved", label: "Resolved" }
  ];

  if (loading) return <Loading className="min-h-screen" />;
  if (error) return <ErrorView message={error} onRetry={loadData} className="min-h-screen" />;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <ApperIcon name="Wrench" className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">QuickFix Home</p>
              </div>
            </div>
            <Button onClick={onClose} variant="ghost" icon="X">
              Close Dashboard
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <ApperIcon name="Users" className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalLeads || 0}</p>
                <p className="text-sm text-gray-600">Total Leads</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-info/10 rounded-full flex items-center justify-center">
                <ApperIcon name="Clock" className="w-6 h-6 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.newLeads || 0}</p>
                <p className="text-sm text-gray-600">New Leads</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                <ApperIcon name="Activity" className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.inProgressLeads || 0}</p>
                <p className="text-sm text-gray-600">In Progress</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                <ApperIcon name="CheckCircle" className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.resolvedLeads || 0}</p>
                <p className="text-sm text-gray-600">Resolved</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Leads Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-0 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Leads</h2>
          </div>

          {!leads.length ? (
            <Empty 
              title="No leads yet" 
              description="Customer inquiries will appear here when they submit the booking form."
              icon="UserPlus"
              className="py-12"
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leads.map((lead) => (
                    <tr key={lead.Id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 truncate max-w-32">
                            {lead.fullName}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-48">
                            {lead.address}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{lead.service}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{lead.phone}</div>
                        <div className="text-sm text-gray-500 truncate max-w-40">{lead.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(new Date(lead.submittedAt), "MMM d, yyyy")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="min-w-0">
                          <Select
                            options={statusOptions}
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.Id, e.target.value)}
                            className="text-sm"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => window.location.href = `tel:${lead.phone}`}
                            className="text-primary hover:text-primary/80 transition-colors duration-normal"
                            title="Call customer"
                          >
                            <ApperIcon name="Phone" className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => window.location.href = `mailto:${lead.email}`}
                            className="text-primary hover:text-primary/80 transition-colors duration-normal"
                            title="Email customer"
                          >
                            <ApperIcon name="Mail" className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteLead(lead.Id)}
                            className="text-error hover:text-error/80 transition-colors duration-normal"
                            title="Delete lead"
                          >
                            <ApperIcon name="Trash2" className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;