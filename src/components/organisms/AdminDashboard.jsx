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
import logoRounded from "/images/logo-rounded.jpg";

const AdminDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState(null);
  const [deleteLeadId, setDeleteLeadId] = useState(null);

  const handleClose = () => {
    window.location.href = "/";
  };

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
      setError(err.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      const lead = leads.find(l => l._id === leadId);
      const oldStatus = lead.status;
  
      await leadService.update(leadId, { status: newStatus });
  
      // update lead list
      setLeads(prev =>
        prev.map(l =>
          l._id === leadId ? { ...l, status: newStatus } : l
        )
      );
  
      // update stats
      setStats(prev => {
        const updated = { ...prev };
  
        if (oldStatus === "New") updated.newLeads--;
        if (oldStatus === "In Progress") updated.inProgressLeads--;
        if (oldStatus === "Resolved") updated.resolvedLeads--;
  
        if (newStatus === "New") updated.newLeads++;
        if (newStatus === "In Progress") updated.inProgressLeads++;
        if (newStatus === "Resolved") updated.resolvedLeads++;
  
        return updated;
      });
  
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update");
    }
  };

  const handleDeleteLead = async (leadId) => {
    try {
      const lead = leads.find(l => l._id === leadId);
  
      await leadService.delete(leadId);
  
      // remove from leads list
      setLeads(prev => prev.filter(l => l._id !== leadId));
  
      // update stats
      setStats(prev => {
        const updated = { ...prev };
  
        updated.totalLeads--;
  
        if (lead.status === "New") updated.newLeads--;
        if (lead.status === "In Progress") updated.inProgressLeads--;
        if (lead.status === "Resolved") updated.resolvedLeads--;
  
        return updated;
      });
  
      toast.success("Lead deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-700";
      case "In Progress":
        return "bg-yellow-100 text-yellow-700";
      case "Resolved":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const statusOptions = [
    { value: "New", label: "New" },
    { value: "In Progress", label: "In Progress" },
    { value: "Resolved", label: "Resolved" }
  ];

  const filteredLeads = leads
    .filter(l => (filter === "All" ? true : l.status === filter))
    .filter(
      l =>
        l.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        l.phone?.includes(search)
    );

  if (loading) return <Loading className="min-h-screen" />;
  if (error) return <ErrorView message={error} onRetry={loadData} />;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">

      {/* HEADER */}

      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              {/* <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <ApperIcon name="Wrench" className="w-5 h-5 text-white" />
              </div> */}
              <img src={logoRounded} alt="Logo" className="w-12 h-12" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">RR HomeTech Services</p>
              </div>
            </div>
            <Button onClick={handleClose} variant="ghost" icon="X">
              Close Dashboard
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">

        {/* STATS */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

         
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card cursor-pointer"
            onClick={() => setFilter("All")}
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
            className="card cursor-pointer"
            onClick={() => setFilter("New")}
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
            className="card cursor-pointer"
            onClick={() => setFilter("In Progress")}
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
            className="card cursor-pointer"
            onClick={() => setFilter("Resolved")}
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

        {/* SEARCH */}

        <div className="flex justify-between mb-4">

          <input
            type="text"
            placeholder="Search name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-lg w-64"
          />

          {filter !== "All" && (
            <Button variant="ghost" onClick={() => setFilter("All")}>
              Clear Filter
            </Button>
          )}

        </div>

        {/* TABLE */}

        {!filteredLeads.length ? (
          <Empty title="No leads found" icon="Users" />
        ) : (

          <div className="bg-white rounded-lg shadow overflow-x-auto">

            <table className="min-w-full">

              <thead className="bg-gray-50">
                <tr>

                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Customer
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Service
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Contact
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y">

                {filteredLeads.map((lead) => (

                  <tr
                    key={lead._id}
                    onClick={() => setSelectedLead(lead)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >

                    <td className="px-4 py-4">

                      <div className="font-medium">{lead.fullName}</div>

                      <div className="text-sm text-gray-500">
                        {lead.address}
                      </div>

                    </td>

                    <td className="px-4 py-4">{lead.service}</td>

                    <td className="px-4 py-4">

                      <div>{lead.phone}</div>

                      <div className="text-sm text-gray-500">
                        {lead.email}
                      </div>

                    </td>

                    <td className="px-4 py-4">
                      {format(new Date(lead.submittedAt), "MMM d, yyyy")}
                    </td>

                    <td className="px-4 py-4">

                      <div className="flex items-center gap-2 flex-wrap"
                      onClick={(e) => e.stopPropagation()}
                      >  

                        <Select 
                          options={statusOptions}
                          value={lead.status}
                          onChange={(e) =>
                            handleStatusChange(lead._id, e.target.value)
                          }
                          className="text-xs"
                        />

                      </div>

                    </td>

                    <td className="px-4 py-4">

                      <div className="flex items-center gap-3 flex-wrap">

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = `tel:${lead.phone}`;
                          }}
                          className="text-blue-600"
                        >
                          <ApperIcon name="Phone" className="w-4 h-4" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = `mailto:${lead.email}`;
                          }}
                          className="text-purple-600"
                        >
                          <ApperIcon name="Mail" className="w-4 h-4" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(
                              `https://wa.me/${lead.phone}`,
                              "_blank"
                            );
                          }}
                          className="text-green-600"
                        >
                          <ApperIcon
                            name="MessageCircle"
                            className="w-4 h-4"
                          />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteLeadId(lead._id);
                          }}
                          className="text-red-600"
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
      </div>

      {/* LEAD DETAILS MODAL */}

      {selectedLead && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Lead Details</h2>

              <button onClick={() => setSelectedLead(null)}>
                <ApperIcon name="X" className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm">

              <div><b>Name:</b> {selectedLead.fullName}</div>
              <div><b>Phone:</b> {selectedLead.phone}</div>
              <div><b>Email:</b> {selectedLead.email}</div>
              <div><b>Service:</b> {selectedLead.service}</div>
              <div><b>Address:</b> {selectedLead.address}</div>
              <div>
                <b>Date:</b>{" "}
                {format(new Date(selectedLead.submittedAt), "PPP")}
              </div>

            </div>

          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}

      {deleteLeadId && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl shadow-lg p-6 w-96">

            <h3 className="text-lg font-semibold mb-3">
              Delete Lead
            </h3>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this lead?
            </p>

            <div className="flex justify-end gap-3">

              <Button
                variant="ghost"
                onClick={() => setDeleteLeadId(null)}
              >
                Cancel
              </Button>

              <Button
                variant="destructive"
                onClick={() => {
                  handleDeleteLead(deleteLeadId);
                  setDeleteLeadId(null);
                }}
              >
                Delete
              </Button>

            </div>

          </div>

        </div>
      )}
    </div>
  );
};

export default AdminDashboard;