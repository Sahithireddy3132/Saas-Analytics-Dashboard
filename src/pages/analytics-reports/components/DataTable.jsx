import React, { useState, useMemo } from 'react';
import Icon from 'components/AppIcon';

const DataTable = ({ data, category }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = useMemo(() => {
    if (category === 'revenue') {
      return [
        { key: 'customer', label: 'Customer', sortable: true, width: '25%' },
        { key: 'plan', label: 'Plan', sortable: true, width: '15%' },
        { key: 'mrr', label: 'MRR', sortable: true, width: '15%', type: 'currency' },
        { key: 'churn', label: 'Churn Risk', sortable: true, width: '15%', type: 'status' },
        { key: 'growth', label: 'Growth %', sortable: true, width: '15%', type: 'percentage' },
        { key: 'actions', label: 'Actions', sortable: false, width: '15%' }
      ];
    } else {
      return [
        { key: 'user', label: 'User', sortable: true, width: '30%' },
        { key: 'lastActive', label: 'Last Active', sortable: true, width: '20%' },
        { key: 'sessions', label: 'Sessions', sortable: true, width: '15%' },
        { key: 'plan', label: 'Plan', sortable: true, width: '15%' },
        { key: 'actions', label: 'Actions', sortable: false, width: '20%' }
      ];
    }
  }, [category]);

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    
    return data.filter(row => {
      return Object.values(row).some(value => 
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [data, searchQuery]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectRow = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedData.map(row => row.id));
    }
  };

  const renderCellContent = (row, column) => {
    const value = row[column.key];

    switch (column.type) {
      case 'currency':
        return `$${value.toLocaleString()}`;
      case 'percentage':
        return (
          <span className={`font-medium ${value >= 0 ? 'text-success-600' : 'text-error-600'}`}>
            {value > 0 ? '+' : ''}{value}%
          </span>
        );
      case 'status':
        return (
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            value === 0 
              ? 'bg-success-100 text-success-700' :'bg-error-100 text-error-700'
          }`}>
            {value === 0 ? 'Low Risk' : 'High Risk'}
          </span>
        );
      default:
        return value;
    }
  };

  const renderActions = (row) => (
    <div className="flex items-center space-x-2">
      <button
        className="p-1 rounded-lg hover:bg-secondary-50 text-text-secondary hover:text-text-primary transition-colors duration-200"
        title="View details"
      >
        <Icon name="Eye" size={14} />
      </button>
      <button
        className="p-1 rounded-lg hover:bg-secondary-50 text-text-secondary hover:text-text-primary transition-colors duration-200"
        title="Edit"
      >
        <Icon name="Edit2" size={14} />
      </button>
      <button
        className="p-1 rounded-lg hover:bg-secondary-50 text-text-secondary hover:text-error-600 transition-colors duration-200"
        title="Delete"
      >
        <Icon name="Trash2" size={14} />
      </button>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-surface">
      {/* Table Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border-b border-border space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-text-primary">
            {category === 'revenue' ? 'Revenue Data' : 'User Data'}
          </h3>
          {selectedRows.length > 0 && (
            <span className="text-sm text-text-secondary">
              {selectedRows.length} selected
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Search" size={16} className="text-text-secondary" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search data..."
              className="pl-10 pr-4 py-2 text-sm bg-secondary-50 border border-transparent rounded-lg focus:outline-none focus:bg-surface focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 transition-all duration-200"
            />
          </div>

          {/* Page Size Selector */}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-3 py-2 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20"
          >
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
          </select>

          {/* Export Button */}
          <button className="flex items-center space-x-2 px-3 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
            <Icon name="Download" size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-secondary-25 sticky top-0">
            <tr>
              <th className="w-12 px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-primary-600 bg-surface border-border rounded focus:ring-primary-500 focus:ring-2 focus:ring-opacity-20"
                />
              </th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left text-xs font-semibold text-text-primary uppercase tracking-wider"
                  style={{ width: column.width }}
                >
                  {column.sortable ? (
                    <button
                      onClick={() => handleSort(column.key)}
                      className="flex items-center space-x-1 hover:text-primary-600 transition-colors duration-200"
                    >
                      <span>{column.label}</span>
                      <Icon 
                        name={
                          sortConfig.key === column.key 
                            ? sortConfig.direction === 'asc' ? 'ChevronUp' : 'ChevronDown' :'ChevronsUpDown'
                        } 
                        size={14} 
                      />
                    </button>
                  ) : (
                    column.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedData.map((row, index) => (
              <tr
                key={row.id}
                className={`hover:bg-secondary-25 transition-colors duration-200 ${
                  selectedRows.includes(row.id) ? 'bg-primary-25' : ''
                }`}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleSelectRow(row.id)}
                    className="w-4 h-4 text-primary-600 bg-surface border-border rounded focus:ring-primary-500 focus:ring-2 focus:ring-opacity-20"
                  />
                </td>
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 text-sm text-text-primary">
                    {column.key === 'actions' 
                      ? renderActions(row)
                      : renderCellContent(row, column)
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {paginatedData.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Database" size={48} className="text-text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">No data found</h3>
            <p className="text-text-secondary">
              {searchQuery ? 'Try adjusting your search criteria' : 'No data available for the selected filters'}
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <span>
              Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} results
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Icon name="ChevronLeft" size={16} className="text-text-secondary" />
            </button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors duration-200 ${
                      currentPage === page
                        ? 'bg-primary text-white' :'text-text-secondary hover:bg-secondary-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Icon name="ChevronRight" size={16} className="text-text-secondary" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;