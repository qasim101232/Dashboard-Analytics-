// ==================== GLOBAL STATE ====================
const PharmaCare = {
    version: '1.0.0',
    data: {
        medicines: [],
        prescriptions: [],
        suppliers: [],
        notifications: []
    },
    charts: {},
    currentUser: null
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadData();
    initializeSidebar();
    initializeTopbar();
    updateDateTime();
    loadPageSpecificComponents();
    initializeNotifications();
    
    // Set interval for real-time updates
    setInterval(updateDateTime, 1000);
    setInterval(checkLowStock, 300000); // Check every 5 minutes
    setInterval(checkExpiringMedicines, 3600000); // Check every hour
}

// ==================== DATA MANAGEMENT ====================
function loadData() {
    // Load medicines
    const savedMedicines = localStorage.getItem('pharmacare_medicines');
    if (savedMedicines) {
        PharmaCare.data.medicines = JSON.parse(savedMedicines);
    } else {
        // Load sample data
        PharmaCare.data.medicines = getSampleMedicines();
        saveMedicines();
    }
    
    // Load prescriptions
    const savedPrescriptions = localStorage.getItem('pharmacare_prescriptions');
    if (savedPrescriptions) {
        PharmaCare.data.prescriptions = JSON.parse(savedPrescriptions);
    } else {
        PharmaCare.data.prescriptions = getSamplePrescriptions();
        savePrescriptions();
    }
    
    // Load suppliers
    const savedSuppliers = localStorage.getItem('pharmacare_suppliers');
    if (savedSuppliers) {
        PharmaCare.data.suppliers = JSON.parse(savedSuppliers);
    } else {
        PharmaCare.data.suppliers = getSampleSuppliers();
        saveSuppliers();
    }
}

function saveMedicines() {
    localStorage.setItem('pharmacare_medicines', JSON.stringify(PharmaCare.data.medicines));
    updateDashboardStats();
}

function savePrescriptions() {
    localStorage.setItem('pharma care_prescriptions', JSON.stringify(PharmaCare.data.prescriptions));
}

function saveSuppliers() {
    localStorage.setItem('pharmacare_suppliers', JSON.stringify(PharmaCare.data.suppliers));
}

// ==================== SAMPLE DATA ====================
function getSampleMedicines() {
    return [
        {
            id: 'MED001',
            name: 'Amoxicillin 500mg',
            genericName: 'Amoxicillin Trihydrate',
            sku: 'MED001',
            batchNo: 'B2024-001',
            manufacturer: 'PharmaCorp',
            category: 'Antibiotic',
            type: 'Capsule',
            brand: 'Amoxil',
            price: 12.99,
            quantity: 150,
            reorderLevel: 30,
            maxStock: 500,
            expiryDate: '2025-12-31',
            requiresPrescription: true,
            controlledSubstance: false,
            supplier: 'SUP001',
            storageTemp: 'room-temp',
            composition: 'Amoxicillin 500mg',
            dosage: 'Take one capsule three times daily',
            sideEffects: 'Nausea, diarrhea',
            description: 'Antibiotic for bacterial infections',
            lastUpdated: new Date().toISOString()
        },
        {
            id: 'MED002',
            name: 'Paracetamol 650mg',
            genericName: 'Acetaminophen',
            sku: 'MED002',
            batchNo: 'B2024-002',
            manufacturer: 'MediLife',
            category: 'Analgesic',
            type: 'Tablet',
            brand: 'Tylenol',
            price: 5.99,
            quantity: 500,
            reorderLevel: 100,
            maxStock: 1000,
            expiryDate: '2026-06-30',
            requiresPrescription: false,
            controlledSubstance: false,
            supplier: 'SUP002',
            storageTemp: 'room-temp',
            composition: 'Paracetamol 650mg',
            dosage: 'Take one tablet every 6 hours as needed',
            sideEffects: 'Liver damage with overdose',
            description: 'Pain reliever and fever reducer',
            lastUpdated: new Date().toISOString()
        },
        {
            id: 'MED003',
            name: 'Insulin Glargine',
            genericName: 'Insulin Glargine',
            sku: 'MED003',
            batchNo: 'B2024-003',
            manufacturer: 'BioPharma',
            category: 'Antidiabetic',
            type: 'Injection',
            brand: 'Lantus',
            price: 85.50,
            quantity: 25,
            reorderLevel: 30,
            maxStock: 100,
            expiryDate: '2024-08-15',
            requiresPrescription: true,
            controlledSubstance: false,
            supplier: 'SUP003',
            storageTemp: 'cold',
            composition: 'Insulin Glargine 100U/mL',
            dosage: 'Inject once daily at bedtime',
            sideEffects: 'Hypoglycemia',
            description: 'Long-acting insulin for diabetes',
            lastUpdated: new Date().toISOString()
        },
        {
            id: 'MED004',
            name: 'Amoxiclav 625mg',
            genericName: 'Co-amoxiclav',
            sku: 'MED004',
            batchNo: 'B2024-004',
            manufacturer: 'PharmaCorp',
            category: 'Antibiotic',
            type: 'Tablet',
            brand: 'Augmentin',
            price: 18.99,
            quantity: 45,
            reorderLevel: 50,
            maxStock: 200,
            expiryDate: '2025-03-20',
            requiresPrescription: true,
            controlledSubstance: false,
            supplier: 'SUP001',
            storageTemp: 'room-temp',
            composition: 'Amoxicillin 500mg, Clavulanic Acid 125mg',
            dosage: 'Take one tablet twice daily',
            sideEffects: 'Diarrhea, nausea',
            description: 'Broad-spectrum antibiotic',
            lastUpdated: new Date().toISOString()
        },
        {
            id: 'MED005',
            name: 'Cetirizine 10mg',
            genericName: 'Cetirizine HCl',
            sku: 'MED005',
            batchNo: 'B2024-005',
            manufacturer: 'MediLife',
            category: 'Antihistamine',
            type: 'Tablet',
            brand: 'Zyrtec',
            price: 4.50,
            quantity: 300,
            reorderLevel: 50,
            maxStock: 500,
            expiryDate: '2026-01-10',
            requiresPrescription: false,
            controlledSubstance: false,
            supplier: 'SUP002',
            storageTemp: 'room-temp',
            composition: 'Cetirizine HCl 10mg',
            dosage: 'Take one tablet daily',
            sideEffects: 'Drowsiness',
            description: 'Allergy relief',
            lastUpdated: new Date().toISOString()
        },
        {
            id: 'MED006',
            name: 'Salbutamol Inhaler',
            genericName: 'Albuterol',
            sku: 'MED006',
            batchNo: 'B2024-006',
            manufacturer: 'RespCare',
            category: 'Respiratory',
            type: 'Inhaler',
            brand: 'Ventolin',
            price: 25.99,
            quantity: 18,
            reorderLevel: 25,
            maxStock: 50,
            expiryDate: '2024-09-30',
            requiresPrescription: true,
            controlledSubstance: false,
            supplier: 'SUP004',
            storageTemp: 'room-temp',
            composition: 'Albuterol 90mcg per actuation',
            dosage: 'Two puffs every 4-6 hours as needed',
            sideEffects: 'Tremor, tachycardia',
            description: 'Bronchodilator for asthma',
            lastUpdated: new Date().toISOString()
        },
        {
            id: 'MED007',
            name: 'Atorvastatin 20mg',
            genericName: 'Atorvastatin Calcium',
            sku: 'MED007',
            batchNo: 'B2024-007',
            manufacturer: 'CardioMed',
            category: 'Cardiovascular',
            type: 'Tablet',
            brand: 'Lipitor',
            price: 32.50,
            quantity: 85,
            reorderLevel: 30,
            maxStock: 150,
            expiryDate: '2026-02-28',
            requiresPrescription: true,
            controlledSubstance: false,
            supplier: 'SUP005',
            storageTemp: 'room-temp',
            composition: 'Atorvastatin 20mg',
            dosage: 'Take one tablet daily',
            sideEffects: 'Muscle pain',
            description: 'Cholesterol-lowering medication',
            lastUpdated: new Date().toISOString()
        },
        {
            id: 'MED008',
            name: 'Omeprazole 20mg',
            genericName: 'Omeprazole',
            sku: 'MED008',
            batchNo: 'B2024-008',
            manufacturer: 'MediLife',
            category: 'Gastrointestinal',
            type: 'Capsule',
            brand: 'Prilosec',
            price: 15.99,
            quantity: 120,
            reorderLevel: 40,
            maxStock: 200,
            expiryDate: '2025-11-15',
            requiresPrescription: false,
            controlledSubstance: false,
            supplier: 'SUP002',
            storageTemp: 'room-temp',
            composition: 'Omeprazole 20mg',
            dosage: 'Take one capsule before breakfast',
            sideEffects: 'Headache',
            description: 'Acid reducer',
            lastUpdated: new Date().toISOString()
        }
    ];
}

function getSamplePrescriptions() {
    return [
        {
            id: 'RX001',
            patientName: 'John Smith',
            patientAge: 45,
            patientGender: 'Male',
            doctorName: 'Dr. Sarah Johnson',
            doctorLicense: 'LIC12345',
            date: '2024-03-15',
            medicines: [
                { name: 'Amoxicillin 500mg', quantity: 2, instructions: 'Take one three times daily' },
                { name: 'Paracetamol 650mg', quantity: 1, instructions: 'Take as needed for pain' }
            ],
            status: 'pending',
            total: 31.97,
            createdAt: '2024-03-15T10:30:00Z'
        },
        {
            id: 'RX002',
            patientName: 'Emily Davis',
            patientAge: 32,
            patientGender: 'Female',
            doctorName: 'Dr. Michael Chen',
            doctorLicense: 'LIC67890',
            date: '2024-03-16',
            medicines: [
                { name: 'Cetirizine 10mg', quantity: 1, instructions: 'Take one daily' }
            ],
            status: 'filled',
            total: 4.50,
            createdAt: '2024-03-16T14:15:00Z'
        },
        {
            id: 'RX003',
            patientName: 'Robert Wilson',
            patientAge: 58,
            patientGender: 'Male',
            doctorName: 'Dr. Emily Brown',
            doctorLicense: 'LIC24680',
            date: '2024-03-16',
            medicines: [
                { name: 'Atorvastatin 20mg', quantity: 3, instructions: 'Take one daily' },
                { name: 'Omeprazole 20mg', quantity: 2, instructions: 'Take before breakfast' }
            ],
            status: 'pending',
            total: 129.48,
            createdAt: '2024-03-16T09:45:00Z'
        },
        {
            id: 'RX004',
            patientName: 'Maria Garcia',
            patientAge: 28,
            patientGender: 'Female',
            doctorName: 'Dr. James Wilson',
            doctorLicense: 'LIC13579',
            date: '2024-03-14',
            medicines: [
                { name: 'Salbutamol Inhaler', quantity: 1, instructions: 'Two puffs as needed' }
            ],
            status: 'picked',
            total: 25.99,
            createdAt: '2024-03-14T16:20:00Z'
        },
        {
            id: 'RX005',
            patientName: 'David Thompson',
            patientAge: 67,
            patientGender: 'Male',
            doctorName: 'Dr. Lisa Anderson',
            doctorLicense: 'LIC97531',
            date: '2024-03-15',
            medicines: [
                { name: 'Insulin Glargine', quantity: 2, instructions: 'Inject at bedtime' },
                { name: 'Amoxiclav 625mg', quantity: 1, instructions: 'Take twice daily' }
            ],
            status: 'ready',
            total: 189.99,
            createdAt: '2024-03-15T11:10:00Z'
        }
    ];
}

function getSampleSuppliers() {
    return [
        {
            id: 'SUP001',
            name: 'PharmaCorp Distributors',
            contactPerson: 'John Doe',
            phone: '+1-800-555-0123',
            email: 'orders@pharmacorp.com',
            address: '123 Industry Blvd, New York, NY 10001',
            categories: ['Antibiotics', 'Analgesics'],
            paymentTerms: 'Net 30',
            status: 'active',
            createdAt: '2024-01-15'
        },
        {
            id: 'SUP002',
            name: 'MediLife Supplies',
            contactPerson: 'Jane Smith',
            phone: '+1-800-555-0124',
            email: 'sales@medilife.com',
            address: '456 Medical Dr, Los Angeles, CA 90001',
            categories: ['Analgesics', 'Antihistamine', 'Gastrointestinal'],
            paymentTerms: 'Net 15',
            status: 'active',
            createdAt: '2024-01-20'
        },
        {
            id: 'SUP003',
            name: 'BioPharma Solutions',
            contactPerson: 'Dr. Robert Chen',
            phone: '+1-800-555-0125',
            email: 'orders@biopharma.com',
            address: '789 Research Park, Boston, MA 02101',
            categories: ['Antidiabetic', 'Biologics'],
            paymentTerms: 'Net 45',
            status: 'trial',
            createdAt: '2024-02-01'
        },
        {
            id: 'SUP004',
            name: 'Respiratory Care Inc',
            contactPerson: 'Michael Brown',
            phone: '+1-800-555-0126',
            email: 'orders@respiratorycare.com',
            address: '321 Health Ave, Chicago, IL 60601',
            categories: ['Respiratory'],
            paymentTerms: 'Net 30',
            status: 'active',
            createdAt: '2024-01-25'
        },
        {
            id: 'SUP005',
            name: 'CardioMed Distributors',
            contactPerson: 'Sarah Wilson',
            phone: '+1-800-555-0127',
            email: 'sales@cardiomed.com',
            address: '654 Heart Lane, Houston, TX 77001',
            categories: ['Cardiovascular'],
            paymentTerms: 'Net 30',
            status: 'active',
            createdAt: '2024-02-10'
        }
    ];
}

// ==================== SIDEBAR FUNCTIONALITY ====================
function initializeSidebar() {
    const toggleBtn = document.getElementById('toggleBtn');
    const mobileBtn = document.getElementById('mobileBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const content = document.getElementById('content');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            content.classList.toggle('expanded');
            
            // Update icon
            const icon = toggleBtn.querySelector('i');
            if (sidebar.classList.contains('collapsed')) {
                icon.className = 'ti ti-layout-sidebar-right-expand';
            } else {
                icon.className = 'ti ti-layout-sidebar-left-expand';
            }
        });
    }

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            sidebar.classList.add('mobile-show');
            overlay.classList.add('show');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('mobile-show');
            overlay.classList.remove('show');
        });
    }

    // Highlight active menu
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// ==================== TOPBAR FUNCTIONALITY ====================
function initializeTopbar() {
    updateDateTime();
}

function updateDateTime() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }
}

// ==================== NOTIFICATIONS ====================
function initializeNotifications() {
    updateNotificationBadge();
}

function updateNotificationBadge() {
    const lowStock = getLowStockMedicines();
    const expiring = getExpiringMedicines();
    const totalAlerts = lowStock.length + expiring.length;
    
    const badges = document.querySelectorAll('.notification-badge');
    badges.forEach(badge => {
        if (totalAlerts > 0) {
            badge.textContent = totalAlerts;
            badge.style.display = 'inline';
        } else {
            badge.style.display = 'none';
        }
    });
    
    // Update notification dropdown
    updateNotificationDropdown(lowStock, expiring);
}

function updateNotificationDropdown(lowStock, expiring) {
    const dropdown = document.querySelector('.dropdown-menu .list-group');
    if (!dropdown) return;
    
    dropdown.innerHTML = '';
    
    if (lowStock.length > 0) {
        lowStock.slice(0, 3).forEach(item => {
            dropdown.innerHTML += `
                <a href="low-stock.html" class="list-group-item list-group-item-action p-3">
                    <div class="d-flex gap-3">
                        <div class="bg-warning bg-opacity-10 rounded-circle p-2">
                            <i class="ti ti-alert-circle text-warning"></i>
                        </div>
                        <div>
                            <p class="mb-0 fw-semibold">Low Stock Alert</p>
                            <small class="text-muted">${item.name} - Only ${item.quantity} left</small>
                            <p class="text-muted small mb-0">Reorder level: ${item.reorderLevel}</p>
                        </div>
                    </div>
                </a>
            `;
        });
    }
    
    if (expiring.length > 0) {
        expiring.slice(0, 3).forEach(item => {
            const daysLeft = Math.ceil((new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
            dropdown.innerHTML += `
                <a href="expiring-medicines.html" class="list-group-item list-group-item-action p-3">
                    <div class="d-flex gap-3">
                        <div class="bg-danger bg-opacity-10 rounded-circle p-2">
                            <i class="ti ti-calendar-exclamation text-danger"></i>
                        </div>
                        <div>
                            <p class="mb-0 fw-semibold">Expiring Soon</p>
                            <small class="text-muted">${item.name} - Expires in ${daysLeft} days</small>
                            <p class="text-muted small mb-0">Batch: ${item.batchNo}</p>
                        </div>
                    </div>
                </a>
            `;
        });
    }
    
    if (lowStock.length === 0 && expiring.length === 0) {
        dropdown.innerHTML = `
            <div class="p-4 text-center text-muted">
                <i class="ti ti-check-circle fs-1 mb-2"></i>
                <p class="mb-0">No new notifications</p>
            </div>
        `;
    }
}

// ==================== DASHBOARD FUNCTIONS ====================
function updateDashboardStats() {
    const medicines = PharmaCare.data.medicines;
    
    // Calculate stats
    const totalItems = medicines.reduce((sum, med) => sum + med.quantity, 0);
    const totalValue = medicines.reduce((sum, med) => sum + (med.price * med.quantity), 0);
    const lowStock = medicines.filter(m => m.quantity <= m.reorderLevel).length;
    const expiring = medicines.filter(m => {
        const daysLeft = Math.ceil((new Date(m.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
        return daysLeft <= 30 && daysLeft > 0;
    }).length;
    
    // Update DOM
    const statElements = {
        'total-items': totalItems,
        'total-value': totalValue,
        'low-stock': lowStock,
        'expiring': expiring,
        'pending-rx': PharmaCare.data.prescriptions.filter(p => p.status === 'pending').length
    };
    
    for (const [id, value] of Object.entries(statElements)) {
        const element = document.querySelector(`[data-stat="${id}"]`);
        if (element) {
            if (id === 'total-value') {
                element.textContent = `$${value.toFixed(2)}`;
            } else {
                element.textContent = value;
            }
        }
    }
    
    // Update notification badge
    updateNotificationBadge();
}

// ==================== MEDICINE FUNCTIONS ====================
function addMedicine(medicine) {
    medicine.id = generateId('MED');
    medicine.lastUpdated = new Date().toISOString();
    PharmaCare.data.medicines.push(medicine);
    saveMedicines();
    showToast('Medicine added successfully!', 'success');
}

function updateMedicine(id, updatedData) {
    const index = PharmaCare.data.medicines.findIndex(m => m.id === id);
    if (index !== -1) {
        PharmaCare.data.medicines[index] = { ...PharmaCare.data.medicines[index], ...updatedData, lastUpdated: new Date().toISOString() };
        saveMedicines();
        showToast('Medicine updated successfully!', 'success');
        return true;
    }
    return false;
}

function deleteMedicine(id) {
    if (confirm('Are you sure you want to delete this medicine?')) {
        PharmaCare.data.medicines = PharmaCare.data.medicines.filter(m => m.id !== id);
        saveMedicines();
        showToast('Medicine deleted successfully!', 'success');
        return true;
    }
    return false;
}

function getLowStockMedicines() {
    return PharmaCare.data.medicines.filter(m => m.quantity <= m.reorderLevel);
}

function getExpiringMedicines() {
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);
    
    return PharmaCare.data.medicines.filter(m => {
        const expiry = new Date(m.expiryDate);
        return expiry <= thirtyDaysFromNow && expiry >= today;
    });
}

// ==================== PRESCRIPTION FUNCTIONS ====================
function addPrescription(prescription) {
    prescription.id = generateId('RX');
    prescription.createdAt = new Date().toISOString();
    prescription.status = 'pending';
    
    // Calculate total
    prescription.total = 0;
    prescription.medicines.forEach(item => {
        const medicine = PharmaCare.data.medicines.find(m => m.name === item.name);
        if (medicine) {
            prescription.total += medicine.price * item.quantity;
        }
    });
    
    PharmaCare.data.prescriptions.push(prescription);
    savePrescriptions();
    showToast('Prescription added successfully!', 'success');
    return prescription.id;
}

function updatePrescriptionStatus(id, status) {
    const prescription = PharmaCare.data.prescriptions.find(p => p.id === id);
    if (prescription) {
        prescription.status = status;
        savePrescriptions();
        showToast(`Prescription marked as ${status}!`, 'success');
        return true;
    }
    return false;
}

// ==================== SUPPLIER FUNCTIONS ====================
function addSupplier(supplier) {
    supplier.id = generateId('SUP');
    supplier.createdAt = new Date().toISOString();
    supplier.status = 'active';
    PharmaCare.data.suppliers.push(supplier);
    saveSuppliers();
    showToast('Supplier added successfully!', 'success');
}

function updateSupplier(id, updatedData) {
    const index = PharmaCare.data.suppliers.findIndex(s => s.id === id);
    if (index !== -1) {
        PharmaCare.data.suppliers[index] = { ...PharmaCare.data.suppliers[index], ...updatedData };
        saveSuppliers();
        showToast('Supplier updated successfully!', 'success');
        return true;
    }
    return false;
}

function deleteSupplier(id) {
    if (confirm('Are you sure you want to delete this supplier?')) {
        PharmaCare.data.suppliers = PharmaCare.data.suppliers.filter(s => s.id !== id);
        saveSuppliers();
        showToast('Supplier deleted successfully!', 'success');
        return true;
    }
    return false;
}

// ==================== UTILITY FUNCTIONS ====================
function generateId(prefix) {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function calculateDaysLeft(expiryDate) {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

function getStatusBadge(status) {
    const badges = {
        'pending': '<span class="badge bg-warning">Pending</span>',
        'filled': '<span class="badge bg-info">Filled</span>',
        'ready': '<span class="badge bg-success">Ready</span>',
        'picked': '<span class="badge bg-secondary">Picked Up</span>',
        'active': '<span class="badge bg-success">Active</span>',
        'inactive': '<span class="badge bg-danger">Inactive</span>',
        'trial': '<span class="badge bg-warning">Trial</span>',
        'low': '<span class="badge bg-warning">Low Stock</span>',
        'critical': '<span class="badge bg-danger">Critical</span>',
        'good': '<span class="badge bg-success">In Stock</span>'
    };
    return badges[status] || `<span class="badge bg-secondary">${status}</span>`;
}

function showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(container);
    }
    
    // Create toast
    const toastId = 'toast-' + Date.now();
    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    container.appendChild(toast);
    
    // Initialize and show toast
    const bsToast = new bootstrap.Toast(toast, { autohide: true, delay: 3000 });
    bsToast.show();
    
    // Remove after hiding
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

// ==================== CHECK FUNCTIONS ====================
function checkLowStock() {
    const lowStock = getLowStockMedicines();
    if (lowStock.length > 0) {
        updateNotificationBadge();
    }
}

function checkExpiringMedicines() {
    const expiring = getExpiringMedicines();
    if (expiring.length > 0) {
        updateNotificationBadge();
    }
}

// ==================== PAGE-SPECIFIC COMPONENTS ====================
function loadPageSpecificComponents() {
    const path = window.location.pathname.split('/').pop() || window.location.href.split('/').pop();
    
    switch(path) {
        case 'index.html':
        case '':
            initializeDashboard();
            break;
        case 'inventory.html':
        case 'inverntory.html':
            initializeInventory();
            break;
        case 'prescriptions.html':
            initializePrescriptions();
            break;
        case 'create-product.html':
            initializeCreateProduct();
            break;
        case 'suppliers.html':
            initializeSuppliers();
            break;
        case 'low-stock.html':
            initializeLowStock();
            break;
        case 'expiring-medicines.html':
            initializeExpiringMedicines();
            break;
        case 'reports.html':
            initializeReports();
            break;
    }
}

// ==================== DASHBOARD INITIALIZATION ====================
function initializeDashboard() {
    updateDashboardStats();
    renderDashboardCharts();
    renderRecentPrescriptions();
    renderExpiringMedicinesTable();
}

function renderDashboardCharts() {
    // Sales Chart
    const salesElement = document.getElementById('salesChart');
    if (salesElement && typeof ApexCharts !== 'undefined') {
        const salesOptions = {
            series: [{
                name: 'Sales',
                data: [3200, 4100, 4800, 5200, 5900, 6800, 7500, 8200, 9100, 10500, 11800, 12500]
            }],
            chart: {
                type: 'area',
                height: 300,
                toolbar: { show: false },
                zoom: { enabled: false }
            },
            colors: ['#2c7da0'],
            dataLabels: { enabled: false },
            stroke: { curve: 'smooth', width: 2 },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.3
                }
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yaxis: {
                labels: {
                    formatter: function(val) {
                        return '$' + val
                    }
                }
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return '$' + val
                    }
                }
            }
        };
        
        PharmaCare.charts.sales = new ApexCharts(salesElement, salesOptions);
        PharmaCare.charts.sales.render();
    }
    
    // Category Chart
    const categoryElement = document.getElementById('categoryChart');
    if (categoryElement && typeof ApexCharts !== 'undefined') {
        // Calculate category distribution
        const categories = {};
        PharmaCare.data.medicines.forEach(med => {
            categories[med.category] = (categories[med.category] || 0) + med.quantity;
        });
        
        const categoryData = Object.entries(categories).map(([name, value]) => ({ name, value }));
        
        const pieOptions = {
            series: categoryData.map(d => d.value),
            chart: {
                type: 'donut',
                height: 250
            },
            labels: categoryData.map(d => d.name),
            colors: ['#2c7da0', '#2a9d8f', '#e9c46a', '#e76f51', '#b0b0b0', '#9c89b8'],
            legend: { position: 'bottom' },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: { width: 200 },
                    legend: { position: 'bottom' }
                }
            }]
        };
        
        PharmaCare.charts.category = new ApexCharts(categoryElement, pieOptions);
        PharmaCare.charts.category.render();
    }
}

function renderRecentPrescriptions() {
    const tbody = document.querySelector('.prescriptions-tbody');
    if (!tbody) return;
    
    const recent = PharmaCare.data.prescriptions.slice(0, 5);
    
    tbody.innerHTML = recent.map(rx => {
        const medicines = rx.medicines.map(m => `${m.name} (${m.quantity})`).join('<br>');
        return `
            <tr data-status="${rx.status}">
                <td><span class="fw-semibold">${rx.id}</span></td>
                <td>
                    ${rx.patientName}<br>
                    <small class="text-muted">${rx.patientAge} yrs, ${rx.patientGender}</small>
                </td>
                <td>${rx.doctorName}</td>
                <td>${formatDate(rx.date)}</td>
                <td>${medicines}</td>
                <td>${getStatusBadge(rx.status)}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="updatePrescriptionStatus('${rx.id}', 'filled')">
                        <i class="ti ti-check"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-secondary" onclick="viewPrescription('${rx.id}')">
                        <i class="ti ti-eye"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function renderExpiringMedicinesTable() {
    const tbody = document.querySelector('.expiring-tbody');
    if (!tbody) return;
    
    const expiring = getExpiringMedicines().slice(0, 5);
    
    tbody.innerHTML = expiring.map(med => {
        const daysLeft = calculateDaysLeft(med.expiryDate);
        const status = daysLeft <= 15 ? 'danger' : 'warning';
        return `
            <tr>
                <td>${med.name}</td>
                <td>${med.batchNo}</td>
                <td>${formatDate(med.expiryDate)}</td>
                <td class="fw-bold text-${status}">${daysLeft} days</td>
                <td><span class="badge bg-${status}">${daysLeft <= 15 ? 'Critical' : 'Warning'}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="location.href='create-product.html?id=${med.id}'">
                        <i class="ti ti-edit"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// ==================== INVENTORY INITIALIZATION ====================
function initializeInventory() {
    renderInventoryTable();
    initializeInventoryFilters();
}

function renderInventoryTable(filteredData = null) {
    const tbody = document.querySelector('.inventory-tbody');
    if (!tbody) return;
    
    const data = filteredData || PharmaCare.data.medicines;
    
    tbody.innerHTML = data.map(med => {
        const daysLeft = calculateDaysLeft(med.expiryDate);
        const stockPercentage = (med.quantity / med.maxStock) * 100;
        let stockClass = 'high';
        let status = 'good';
        
        if (med.quantity <= med.reorderLevel) {
            stockClass = 'low';
            status = 'low';
        } else if (med.quantity <= med.reorderLevel * 1.5) {
            stockClass = 'medium';
        }
        
        if (daysLeft <= 30) {
            status = daysLeft <= 15 ? 'critical' : 'low';
        }
        
        return `
            <tr>
                <td>
                    <div class="d-flex align-items-center">
                        <div class="bg-primary bg-opacity-10 rounded-2 p-2 me-2">
                            <i class="ti ti-${getMedicineIcon(med.type)} text-primary"></i>
                        </div>
                        <div>
                            <span class="fw-semibold">${med.name}</span>
                            <div class="small text-muted">${med.genericName || ''}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <div>${med.sku}</div>
                    <small class="text-muted">${med.batchNo}</small>
                </td>
                <td>${med.category}</td>
                <td>${formatCurrency(med.price)}</td>
                <td>
                    <div class="d-flex align-items-center">
                        <span class="fw-semibold me-2">${med.quantity}</span>
                        <div class="stock-bar">
                            <div class="stock-fill ${stockClass}" style="width: ${Math.min(stockPercentage, 100)}%"></div>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="text-${daysLeft <= 30 ? 'danger' : 'success'}">${formatDate(med.expiryDate)}</span>
                    <small class="text-muted d-block">${daysLeft} days</small>
                </td>
                <td>${getStatusBadge(status)}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="editMedicine('${med.id}')">
                        <i class="ti ti-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteMedicine('${med.id}')">
                        <i class="ti ti-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function getMedicineIcon(type) {
    const icons = {
        'Tablet': 'tablet',
        'Capsule': 'capsule',
        'Syrup': 'bottle',
        'Injection': 'injection',
        'Inhaler': 'wind',
        'Ointment': 'cream',
        'Drops': 'droplet'
    };
    return icons[type] || 'pill';
}

function initializeInventoryFilters() {
    const searchInput = document.getElementById('searchInventory');
    const categorySelect = document.getElementById('categoryFilter');
    const statusSelect = document.getElementById('statusFilter');
    const filterBtn = document.querySelector('button[onclick="filterInventory()"]');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterInventory);
    }
    
    if (categorySelect) {
        categorySelect.addEventListener('change', filterInventory);
    }
    
    if (statusSelect) {
        statusSelect.addEventListener('change', filterInventory);
    }
}

function filterInventory() {
    const searchTerm = document.getElementById('searchInventory')?.value.toLowerCase() || '';
    const category = document.getElementById('categoryFilter')?.value || '';
    const status = document.getElementById('statusFilter')?.value || '';
    
    let filtered = PharmaCare.data.medicines;
    
    if (searchTerm) {
        filtered = filtered.filter(med => 
            med.name.toLowerCase().includes(searchTerm) ||
            (med.genericName && med.genericName.toLowerCase().includes(searchTerm)) ||
            med.sku.toLowerCase().includes(searchTerm)
        );
    }
    
    if (category && category !== '') {
        filtered = filtered.filter(med => med.category === category);
    }
    
    if (status && status !== '') {
        switch(status) {
            case 'In Stock':
                filtered = filtered.filter(med => med.quantity > med.reorderLevel);
                break;
            case 'Low Stock':
                filtered = filtered.filter(med => med.quantity <= med.reorderLevel && med.quantity > 0);
                break;
            case 'Out of Stock':
                filtered = filtered.filter(med => med.quantity === 0);
                break;
            case 'Expiring Soon':
                filtered = filtered.filter(med => calculateDaysLeft(med.expiryDate) <= 30);
                break;
        }
    }
    
    renderInventoryTable(filtered);
}

function editMedicine(id) {
    const medicine = PharmaCare.data.medicines.find(m => m.id === id);
    if (medicine) {
        localStorage.setItem('edit_medicine', JSON.stringify(medicine));
        window.location.href = 'create-product.html?edit=' + id;
    }
}

// ==================== CREATE PRODUCT INITIALIZATION ====================
function initializeCreateProduct() {
    const form = document.getElementById('addMedicineForm');
    if (!form) return;
    
    // Check if editing
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    
    if (editId) {
        loadMedicineForEdit(editId);
    }
    
    form.addEventListener('submit', handleMedicineSubmit);
    form.addEventListener('reset', handleFormReset);
    
    // Add SKU generator
    const skuField = document.getElementById('medicineSKU');
    if (skuField && !editId) {
        skuField.value = 'MED' + Date.now().toString().slice(-6);
    }
    
    // Add batch number generator
    const batchField = document.getElementById('batchNo');
    if (batchField && !editId) {
        const today = new Date();
        batchField.value = `B${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
    }
}

function loadMedicineForEdit(id) {
    const medicine = PharmaCare.data.medicines.find(m => m.id === id);
    if (!medicine) return;
    
    const form = document.getElementById('addMedicineForm');
    const fields = {
        'medicineName': medicine.name,
        'genericName': medicine.genericName,
        'medicineSKU': medicine.sku,
        'batchNo': medicine.batchNo,
        'manufacturer': medicine.manufacturer,
        'medicineCategory': medicine.category,
        'medicineType': medicine.type,
        'brand': medicine.brand,
        'storageTemp': medicine.storageTemp,
        'requiresPrescription': medicine.requiresPrescription,
        'controlledSubstance': medicine.controlledSubstance,
        'supplier': medicine.supplier,
        'unitPrice': medicine.price,
        'unitType': medicine.unit || medicine.unitType,
        'quantity': medicine.quantity,
        'reorderLevel': medicine.reorderLevel,
        'maxStock': medicine.maxStock,
        'manufacturingDate': medicine.mfgDate || medicine.manufacturingDate,
        'expiryDate': medicine.expiryDate,
        'composition': medicine.composition,
        'dosage': medicine.dosage,
        'sideEffects': medicine.sideEffects,
        'description': medicine.description
    };
    
    for (const [id, value] of Object.entries(fields)) {
        const field = document.getElementById(id);
        if (field) {
            if (field.type === 'checkbox') {
                field.checked = value;
            } else {
                field.value = value || '';
            }
        }
    }
    
    // Change submit button text
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="ti ti-device-floppy me-1"></i>Update Medicine';
    }
    
    // Add hidden field for ID
    let hiddenId = document.getElementById('medicineId');
    if (!hiddenId) {
        hiddenId = document.createElement('input');
        hiddenId.type = 'hidden';
        hiddenId.id = 'medicineId';
        form.appendChild(hiddenId);
    }
    hiddenId.value = id;
}

function handleMedicineSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }
    
    const medicineId = document.getElementById('medicineId')?.value;
    
    const medicine = {
        name: document.getElementById('medicineName').value,
        genericName: document.getElementById('genericName').value,
        sku: document.getElementById('medicineSKU').value,
        batchNo: document.getElementById('batchNo').value,
        manufacturer: document.getElementById('manufacturer').value,
        category: document.getElementById('medicineCategory').value,
        type: document.getElementById('medicineType').value,
        brand: document.getElementById('brand').value,
        storageTemp: document.getElementById('storageTemp').value,
        requiresPrescription: document.getElementById('requiresPrescription').checked,
        controlledSubstance: document.getElementById('controlledSubstance').checked,
        supplier: document.getElementById('supplier')?.value,
        price: parseFloat(document.getElementById('unitPrice').value),
        unit: document.getElementById('unitType')?.value || 'Strip',
        quantity: parseInt(document.getElementById('quantity').value),
        reorderLevel: parseInt(document.getElementById('reorderLevel').value),
        maxStock: parseInt(document.getElementById('maxStock').value) || 0,
        mfgDate: document.getElementById('manufacturingDate')?.value,
        expiryDate: document.getElementById('expiryDate').value,
        composition: document.getElementById('composition').value,
        dosage: document.getElementById('dosage').value,
        sideEffects: document.getElementById('sideEffects').value,
        description: document.getElementById('description').value
    };
    
    if (medicineId) {
        // Update existing
        updateMedicine(medicineId, medicine);
    } else {
        // Add new
        addMedicine(medicine);
    }
    
    setTimeout(() => {
        window.location.href = 'inventory.html';
    }, 1500);
}

function handleFormReset(e) {
    if (confirm('Are you sure you want to clear the form?')) {
        // Reset to defaults
        document.getElementById('medicineSKU').value = 'MED' + Date.now().toString().slice(-6);
        document.getElementById('reorderLevel').value = '10';
        
        const today = new Date();
        document.getElementById('batchNo').value = `B${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
    } else {
        e.preventDefault();
    }
}

// ==================== PRESCRIPTIONS INITIALIZATION ====================
function initializePrescriptions() {
    renderPrescriptionsTable();
    initializePrescriptionFilters();
    initializePrescriptionModal();
}

function renderPrescriptionsTable(filteredData = null) {
    const tbody = document.querySelector('.prescriptions-tbody');
    if (!tbody) return;
    
    const data = filteredData || PharmaCare.data.prescriptions;
    
    tbody.innerHTML = data.map(rx => {
        const medicines = rx.medicines.map(m => `${m.name} (${m.quantity})`).join('<br>');
        const smallMedicines = rx.medicines.map(m => `<small class="text-muted d-block">${m.name} (${m.quantity}) - ${m.instructions}</small>`).join('');
        
        return `
            <tr data-status="${rx.status}">
                <td><span class="fw-semibold">${rx.id}</span></td>
                <td>
                    ${rx.patientName}<br>
                    <small class="text-muted">${rx.patientAge} yrs, ${rx.patientGender}</small>
                </td>
                <td>${rx.doctorName}</td>
                <td>${formatDate(rx.date)}</td>
                <td>
                    ${smallMedicines}
                </td>
                <td>${getStatusBadge(rx.status)}</td>
                <td>
                    ${getPrescriptionActions(rx)}
                </td>
            </tr>
        `;
    }).join('');
}

function getPrescriptionActions(rx) {
    const actions = [];
    
    if (rx.status === 'pending') {
        actions.push(`<button class="btn btn-sm btn-primary me-1" onclick="updatePrescriptionStatus('${rx.id}', 'filled')"><i class="ti ti-check"></i> Fill</button>`);
    } else if (rx.status === 'filled') {
        actions.push(`<button class="btn btn-sm btn-success me-1" onclick="updatePrescriptionStatus('${rx.id}', 'ready')"><i class="ti ti-check-double"></i> Ready</button>`);
    } else if (rx.status === 'ready') {
        actions.push(`<button class="btn btn-sm btn-primary me-1" onclick="updatePrescriptionStatus('${rx.id}', 'picked')"><i class="ti ti-shopping-cart"></i> Picked</button>`);
    }
    
    actions.push(`<button class="btn btn-sm btn-outline-secondary" onclick="viewPrescription('${rx.id}')"><i class="ti ti-eye"></i></button>`);
    
    return actions.join('');
}

function initializePrescriptionFilters() {
    const tabs = document.querySelectorAll('#rxTabs .nav-link');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const status = tab.dataset.status;
            filterPrescriptionsByStatus(status);
        });
    });
}

function filterPrescriptionsByStatus(status) {
    if (status === 'all') {
        renderPrescriptionsTable();
    } else {
        const filtered = PharmaCare.data.prescriptions.filter(rx => rx.status === status);
        renderPrescriptionsTable(filtered);
    }
}

function initializePrescriptionModal() {
    const medicineSelects = document.querySelectorAll('#medicineRows select');
    if (medicineSelects.length > 0) {
        populateMedicineOptions();
    }
}

function populateMedicineOptions() {
    const selects = document.querySelectorAll('#medicineRows select');
    const medicines = PharmaCare.data.medicines.map(m => m.name);
    
    selects.forEach(select => {
        select.innerHTML = medicines.map(name => 
            `<option value="${name}">${name}</option>`
        ).join('');
    });
}

function addMedicineRow() {
    const container = document.getElementById('medicineRows');
    const medicines = PharmaCare.data.medicines.map(m => m.name);
    
    const newRow = document.createElement('div');
    newRow.className = 'row mb-2';
    newRow.innerHTML = `
        <div class="col-md-6">
            <select class="form-select" required>
                <option value="">Select Medicine</option>
                ${medicines.map(name => `<option value="${name}">${name}</option>`).join('')}
            </select>
        </div>
        <div class="col-md-2">
            <input type="number" class="form-control" placeholder="Qty" value="1" min="1" required>
        </div>
        <div class="col-md-4">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Instructions">
                <button class="btn btn-outline-danger" type="button" onclick="this.closest('.row').remove()">
                    <i class="ti ti-x"></i>
                </button>
            </div>
        </div>
    `;
    container.appendChild(newRow);
}

function savePrescription() {
    const form = document.querySelector('#newRxModal form');
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }
    
    const medicineRows = document.querySelectorAll('#medicineRows .row');
    const medicines = [];
    
    for (const row of medicineRows) {
        const select = row.querySelector('select');
        const qty = row.querySelector('input[type="number"]');
        const instructions = row.querySelector('input[placeholder="Instructions"]');
        
        if (select.value) {
            medicines.push({
                name: select.value,
                quantity: parseInt(qty.value),
                instructions: instructions.value || 'As directed'
            });
        }
    }
    
    if (medicines.length === 0) {
        alert('Please add at least one medicine');
        return;
    }
    
    const prescription = {
        patientName: document.getElementById('patientName').value,
        patientAge: parseInt(document.getElementById('patientAge').value),
        patientGender: document.getElementById('patientGender').value,
        doctorName: document.getElementById('doctorName').value,
        doctorLicense: document.getElementById('licenseNo').value,
        date: new Date().toISOString().split('T')[0],
        medicines: medicines
    };
    
    addPrescription(prescription);
    
    // Close modal and reset
    const modal = bootstrap.Modal.getInstance(document.getElementById('newRxModal'));
    modal.hide();
    form.reset();
    form.classList.remove('was-validated');
    
    // Reload prescriptions table
    renderPrescriptionsTable();
}

function viewPrescription(id) {
    const prescription = PharmaCare.data.prescriptions.find(p => p.id === id);
    if (!prescription) return;
    
    // Create modal dynamically
    const modalHtml = `
        <div class="modal fade" id="viewRxModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Prescription #${prescription.id}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <h6>Patient Information</h6>
                            <p><strong>Name:</strong> ${prescription.patientName}</p>
                            <p><strong>Age/Gender:</strong> ${prescription.patientAge} / ${prescription.patientGender}</p>
                        </div>
                        <div class="mb-3">
                            <h6>Prescriber Information</h6>
                            <p><strong>Doctor:</strong> ${prescription.doctorName}</p>
                            <p><strong>License #:</strong> ${prescription.doctorLicense}</p>
                        </div>
                        <div class="mb-3">
                            <h6>Medicines</h6>
                            ${prescription.medicines.map(m => `
                                <div class="border-bottom pb-2 mb-2">
                                    <p class="mb-0"><strong>${m.name}</strong> x${m.quantity}</p>
                                    <small class="text-muted">${m.instructions}</small>
                                </div>
                            `).join('')}
                        </div>
                        <div class="mb-3">
                            <h6>Status: ${getStatusBadge(prescription.status)}</h6>
                            <p><strong>Date:</strong> ${formatDate(prescription.date)}</p>
                            <p><strong>Total:</strong> ${formatCurrency(prescription.total)}</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onclick="printPrescription('${prescription.id}')">
                            <i class="ti ti-printer"></i> Print
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('viewRxModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add to body and show
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const modal = new bootstrap.Modal(document.getElementById('viewRxModal'));
    modal.show();
}

function printPrescription(id) {
    window.open(`print-prescription.html?id=${id}`, '_blank');
}

// ==================== LOW STOCK INITIALIZATION ====================
function initializeLowStock() {
    renderLowStockTable();
}

function renderLowStockTable() {
    const tbody = document.querySelector('.low-stock-tbody');
    if (!tbody) return;
    
    const lowStock = getLowStockMedicines();
    
    tbody.innerHTML = lowStock.map(med => {
        const daysLeft = calculateDaysLeft(med.expiryDate);
        const status = med.quantity === 0 ? 'Out of Stock' : 
                      med.quantity <= med.reorderLevel / 2 ? 'Critical' : 'Low';
        const badgeClass = med.quantity === 0 ? 'danger' : 
                          med.quantity <= med.reorderLevel / 2 ? 'danger' : 'warning';
        
        return `
            <tr>
                <td>
                    <div class="d-flex align-items-center">
                        <div class="bg-${badgeClass} bg-opacity-10 p-2 rounded me-2">
                            <i class="ti ti-${getMedicineIcon(med.type)} text-${badgeClass}"></i>
                        </div>
                        <div>
                            <span class="fw-semibold">${med.name}</span>
                            <div class="small text-muted">${med.category}</div>
                        </div>
                    </div>
                </td>
                <td class="fw-bold text-${badgeClass}">${med.quantity} ${med.unit || 'units'}</td>
                <td>${med.reorderLevel} ${med.unit || 'units'}</td>
                <td class="text-${badgeClass}">${daysLeft} days</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="quickReorder('${med.id}')">
                        <i class="ti ti-shopping-cart"></i> Reorder
                    </button>
                    <button class="btn btn-sm btn-outline-secondary" onclick="editMedicine('${med.id}')">
                        <i class="ti ti-edit"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
    
    // Update header count
    const headerCount = document.querySelector('.low-stock-count');
    if (headerCount) {
        headerCount.textContent = lowStock.length;
    }
}

function quickReorder(id) {
    const medicine = PharmaCare.data.medicines.find(m => m.id === id);
    if (!medicine) return;
    
    const supplier = PharmaCare.data.suppliers.find(s => s.id === medicine.supplier);
    
    const reorderQty = prompt(
        `Reorder ${medicine.name}\nCurrent Stock: ${medicine.quantity}\nReorder Level: ${medicine.reorderLevel}\n\nEnter quantity to order:`,
        medicine.reorderLevel * 2
    );
    
    if (reorderQty && !isNaN(reorderQty) && parseInt(reorderQty) > 0) {
        alert(`Purchase order created for ${reorderQty} units of ${medicine.name} from ${supplier?.name || 'supplier'}`);
        // In real app, this would create a PO
    }
}

function generatePurchaseOrder() {
    const lowStock = getLowStockMedicines();
    
    if (lowStock.length === 0) {
        alert('No low stock items to reorder');
        return;
    }
    
    const poNumber = 'PO-' + Date.now().toString().slice(-8);
    let poDetails = `Purchase Order #${poNumber}\n\n`;
    poDetails += `Date: ${new Date().toLocaleDateString()}\n`;
    poDetails += `Generated from Low Stock Alert\n\n`;
    poDetails += `Items to Reorder:\n`;
    poDetails += `-'.repeat(50)\n`;
    
    lowStock.forEach(med => {
        const supplier = PharmaCare.data.suppliers.find(s => s.id === med.supplier);
        const suggestedQty = med.reorderLevel * 2 - med.quantity;
        poDetails += `${med.name}: Current ${med.quantity}, Order ${suggestedQty} from ${supplier?.name || 'Unknown'}\n`;
    });
    
    alert(poDetails);
    // In real app, this would generate a PDF or send to suppliers
}

// ==================== EXPIRING MEDICINES INITIALIZATION ====================
function initializeExpiringMedicines() {
    renderExpiringMedicinesFullTable();
}

function renderExpiringMedicinesFullTable() {
    const tbody = document.querySelector('.expiring-tbody');
    if (!tbody) return;
    
    const expiring = getExpiringMedicines();
    
    tbody.innerHTML = expiring.map(med => {
        const daysLeft = calculateDaysLeft(med.expiryDate);
        const status = daysLeft <= 15 ? 'Critical' : 'Warning';
        const badgeClass = daysLeft <= 15 ? 'danger' : 'warning';
        
        return `
            <tr>
                <td>
                    <div class="d-flex align-items-center">
                        <div class="bg-${badgeClass} bg-opacity-10 p-2 rounded me-2">
                            <i class="ti ti-${getMedicineIcon(med.type)} text-${badgeClass}"></i>
                        </div>
                        <div>
                            <span class="fw-semibold">${med.name}</span>
                            <div class="small text-muted">${med.category}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <div>${med.sku}</div>
                    <small class="text-muted">${med.batchNo}</small>
                </td>
                <td>${med.quantity} ${med.unit || 'units'}</td>
                <td class="fw-bold text-${badgeClass}">${formatDate(med.expiryDate)}</td>
                <td class="fw-bold text-${badgeClass}">${daysLeft} days</td>
                <td><span class="badge bg-${badgeClass}">${status}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="editMedicine('${med.id}')">
                        <i class="ti ti-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteMedicine('${med.id}')">
                        <i class="ti ti-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
    
    // Update header count
    const headerCount = document.querySelector('.expiring-count');
    if (headerCount) {
        headerCount.textContent = expiring.length;
    }
}

// ==================== SUPPLIERS INITIALIZATION ====================
function initializeSuppliers() {
    renderSuppliersGrid();
}

function renderSuppliersGrid() {
    const container = document.querySelector('.suppliers-grid');
    if (!container) return;
    
    container.innerHTML = PharmaCare.data.suppliers.map(supplier => `
        <div class="col-md-6 col-lg-4">
            <div class="card h-100">
                <div class="card-body">
                    <div class="d-flex align-items-center mb-3">
                        <div class="bg-primary bg-opacity-10 p-3 rounded-3 me-3">
                            <i class="ti ti-building-warehouse fs-4 text-primary"></i>
                        </div>
                        <div>
                            <h5 class="mb-1">${supplier.name}</h5>
                            <span class="badge bg-light text-dark">ID: ${supplier.id}</span>
                        </div>
                    </div>
                    <div class="mb-3">
                        <p class="mb-1"><i class="ti ti-user me-2"></i>${supplier.contactPerson}</p>
                        <p class="mb-1"><i class="ti ti-phone me-2"></i>${supplier.phone}</p>
                        <p class="mb-1"><i class="ti ti-mail me-2"></i>${supplier.email}</p>
                        <p class="mb-1"><i class="ti ti-map-pin me-2"></i>${supplier.address}</p>
                        <p class="mb-1"><small class="text-muted">Categories: ${supplier.categories.join(', ')}</small></p>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        ${getStatusBadge(supplier.status)}
                        <div>
                            <button class="btn btn-sm btn-outline-primary me-1" onclick="editSupplier('${supplier.id}')">
                                <i class="ti ti-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger" onclick="deleteSupplier('${supplier.id}')">
                                <i class="ti ti-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function saveSupplier() {
    const form = document.querySelector('#newSupplierModal form');
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }
    
    const categories = Array.from(document.querySelector('#newSupplierModal select[multiple] option:checked'))
        .map(opt => opt.value);
    
    const supplier = {
        name: document.querySelector('#newSupplierModal input[placeholder*="Company"]').value,
        contactPerson: document.querySelector('#newSupplierModal input[placeholder*="Contact"]').value,
        phone: document.querySelector('#newSupplierModal input[type="tel"]').value,
        email: document.querySelector('#newSupplierModal input[type="email"]').value,
        address: document.querySelector('#newSupplierModal textarea').value,
        categories: categories.length ? categories : ['General'],
        paymentTerms: document.querySelector('#newSupplierModal select:last-of-type').value
    };
    
    addSupplier(supplier);
    
    // Close modal and reset
    const modal = bootstrap.Modal.getInstance(document.getElementById('newSupplierModal'));
    modal.hide();
    form.reset();
    form.classList.remove('was-validated');
    
    // Reload suppliers
    renderSuppliersGrid();
}

function editSupplier(id) {
    const supplier = PharmaCare.data.suppliers.find(s => s.id === id);
    if (!supplier) return;
    
    alert(`Edit supplier functionality would open with data for ${supplier.name}`);
    // In real app, this would open a modal with filled data
}

// ==================== REPORTS INITIALIZATION ====================
function initializeReports() {
    renderReportsCharts();
    renderTopSellingTable();
}

function renderReportsCharts() {
    // Monthly Sales Chart
    const monthlyElement = document.getElementById('monthlySalesChart');
    if (monthlyElement && typeof ApexCharts !== 'undefined') {
        // Generate sales data based on prescriptions
        const monthlySales = calculateMonthlySales();
        
        const options = {
            series: [{
                name: 'Sales',
                data: monthlySales
            }],
            chart: {
                type: 'bar',
                height: 300,
                toolbar: { show: false },
                zoom: { enabled: false }
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: false,
                }
            },
            colors: ['#2c7da0'],
            dataLabels: { enabled: false },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yaxis: {
                labels: {
                    formatter: function(val) {
                        return '$' + val.toFixed(0)
                    }
                }
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return '$' + val.toFixed(2)
                    }
                }
            }
        };
        
        if (PharmaCare.charts.monthly) {
            PharmaCare.charts.monthly.updateOptions(options);
        } else {
            PharmaCare.charts.monthly = new ApexCharts(monthlyElement, options);
            PharmaCare.charts.monthly.render();
        }
    }
    
    // Category Pie Chart
    const pieElement = document.getElementById('categoryPieChart');
    if (pieElement && typeof ApexCharts !== 'undefined') {
        const categorySales = calculateCategorySales();
        
        const pieOptions = {
            series: categorySales.map(c => c.value),
            chart: {
                type: 'pie',
                height: 300
            },
            labels: categorySales.map(c => c.name),
            colors: ['#2c7da0', '#2a9d8f', '#e9c46a', '#e76f51', '#b0b0b0', '#9c89b8'],
            legend: { position: 'bottom' },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: { width: 300 },
                    legend: { position: 'bottom' }
                }
            }],
            tooltip: {
                y: {
                    formatter: function(val) {
                        return '$' + val.toFixed(2)
                    }
                }
            }
        };
        
        if (PharmaCare.charts.categoryPie) {
            PharmaCare.charts.categoryPie.updateOptions(pieOptions);
        } else {
            PharmaCare.charts.categoryPie = new ApexCharts(pieElement, pieOptions);
            PharmaCare.charts.categoryPie.render();
        }
    }
}

function calculateMonthlySales() {
    // This would normally calculate from actual sales data
    // For demo, return sample data
    return [3200, 4100, 4800, 5200, 5900, 6800, 7500, 8200, 9100, 10500, 11800, 12500];
}

function calculateCategorySales() {
    const categories = {};
    
    PharmaCare.data.medicines.forEach(med => {
        const sales = med.price * med.quantity * 0.3; // Assume 30% of stock sold
        categories[med.category] = (categories[med.category] || 0) + sales;
    });
    
    return Object.entries(categories)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);
}

function renderTopSellingTable() {
    const tbody = document.querySelector('.top-selling-tbody');
    if (!tbody) return;
    
    // Calculate sales for each medicine
    const medicineSales = PharmaCare.data.medicines.map(med => ({
        ...med,
        sales: med.price * med.quantity * 0.4 // Assume 40% of stock sold
    }));
    
    const topSelling = medicineSales
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 5);
    
    tbody.innerHTML = topSelling.map(med => {
        const trend = Math.floor(Math.random() * 20) + 5; // Random trend for demo
        const trendIcon = trend > 10 ? 'trending-up' : 'trending-down';
        const trendClass = trend > 10 ? 'success' : 'danger';
        
        return `
            <tr>
                <td>
                    <div class="d-flex align-items-center">
                        <div class="bg-primary bg-opacity-10 p-2 rounded me-2">
                            <i class="ti ti-${getMedicineIcon(med.type)} text-primary"></i>
                        </div>
                        <div>
                            <span class="fw-semibold">${med.name}</span>
                            <div class="small text-muted">${med.category}</div>
                        </div>
                    </div>
                </td>
                <td>${med.category}</td>
                <td>${Math.floor(med.quantity * 0.4)} units</td>
                <td>${formatCurrency(med.sales)}</td>
                <td><span class="text-${trendClass}"><i class="ti ti-${trendIcon}"></i> +${trend}%</span></td>
            </tr>
        `;
    }).join('');
}

// ==================== EXPORT FUNCTIONS ====================
// Make functions globally available
window.PharmaCare = PharmaCare;
window.addMedicine = addMedicine;
window.updateMedicine = updateMedicine;
window.deleteMedicine = deleteMedicine;
window.addPrescription = addPrescription;
window.updatePrescriptionStatus = updatePrescriptionStatus;
window.addSupplier = addSupplier;
window.updateSupplier = updateSupplier;
window.deleteSupplier = deleteSupplier;
window.editMedicine = editMedicine;
window.viewPrescription = viewPrescription;
window.addMedicineRow = addMedicineRow;
window.savePrescription = savePrescription;
window.generatePurchaseOrder = generatePurchaseOrder;
window.quickReorder = quickReorder;
window.saveSupplier = saveSupplier;
window.editSupplier = editSupplier;
window.printPrescription = printPrescription;
window.formatCurrency = formatC
urrency;
window.formatDate = formatDate;