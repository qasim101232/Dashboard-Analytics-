// Pharmacy Data Management

class PharmacyData {
  constructor() {
    this.medicines = this.loadMedicines() || this.getDefaultMedicines();
    this.prescriptions = this.loadPrescriptions() || this.getDefaultPrescriptions();
    this.suppliers = this.loadSuppliers() || this.getDefaultSuppliers();
    this.transactions = this.loadTransactions() || this.getDefaultTransactions();
  }

  // Load from localStorage
  loadMedicines() {
    const data = localStorage.getItem('pharmacy_medicines');
    return data ? JSON.parse(data) : null;
  }

  loadPrescriptions() {
    const data = localStorage.getItem('pharmacy_prescriptions');
    return data ? JSON.parse(data) : null;
  }

  loadSuppliers() {
    const data = localStorage.getItem('pharmacy_suppliers');
    return data ? JSON.parse(data) : null;
  }

  loadTransactions() {
    const data = localStorage.getItem('pharmacy_transactions');
    return data ? JSON.parse(data) : null;
  }

  // Save to localStorage
  saveMedicines() {
    localStorage.setItem('pharmacy_medicines', JSON.stringify(this.medicines));
  }

  savePrescriptions() {
    localStorage.setItem('pharmacy_prescriptions', JSON.stringify(this.prescriptions));
  }

  saveSuppliers() {
    localStorage.setItem('pharmacy_suppliers', JSON.stringify(this.suppliers));
  }

  saveTransactions() {
    localStorage.setItem('pharmacy_transactions', JSON.stringify(this.transactions));
  }

  // Default data
  getDefaultMedicines() {
    return [
      {
        id: 'MED001',
        name: 'Amoxicillin 500mg',
        category: 'Antibiotic',
        type: 'Capsule',
        brand: 'Generic',
        price: 12.99,
        unit: 'strip',
        quantity: 150,
        expiryDate: '2025-12-31',
        batchNo: 'B2024-001',
        manufacturer: 'PharmaCorp',
        requiresPrescription: true,
        storageTemp: 'room-temp',
        reorderLevel: 30,
        supplier: 'SUP001'
      },
      {
        id: 'MED002',
        name: 'Paracetamol 650mg',
        category: 'Analgesic',
        type: 'Tablet',
        brand: 'HealthPharm',
        price: 5.99,
        unit: 'strip',
        quantity: 500,
        expiryDate: '2026-06-30',
        batchNo: 'B2024-002',
        manufacturer: 'MediLife',
        requiresPrescription: false,
        storageTemp: 'room-temp',
        reorderLevel: 100,
        supplier: 'SUP002'
      },
      {
        id: 'MED003',
        name: 'Insulin Glargine',
        category: 'Antidiabetic',
        type: 'Injection',
        brand: 'DiabeCare',
        price: 85.50,
        unit: 'vial',
        quantity: 25,
        expiryDate: '2024-08-15',
        batchNo: 'B2024-003',
        manufacturer: 'BioPharma',
        requiresPrescription: true,
        storageTemp: 'cold',
        reorderLevel: 10,
        supplier: 'SUP003'
      },
      {
        id: 'MED004',
        name: 'Amoxiclav 625mg',
        category: 'Antibiotic',
        type: 'Tablet',
        brand: 'Augmentin',
        price: 18.99,
        unit: 'strip',
        quantity: 45,
        expiryDate: '2025-03-20',
        batchNo: 'B2024-004',
        manufacturer: 'GSK',
        requiresPrescription: true,
        storageTemp: 'room-temp',
        reorderLevel: 20,
        supplier: 'SUP001'
      },
      {
        id: 'MED005',
        name: 'Cetirizine 10mg',
        category: 'Antihistamine',
        type: 'Tablet',
        brand: 'Zyrtec',
        price: 4.50,
        unit: 'strip',
        quantity: 300,
        expiryDate: '2026-01-10',
        batchNo: 'B2024-005',
        manufacturer: 'UCB Pharma',
        requiresPrescription: false,
        storageTemp: 'room-temp',
        reorderLevel: 50,
        supplier: 'SUP002'
      },
      {
        id: 'MED006',
        name: 'Salbutamol Inhaler',
        category: 'Respiratory',
        type: 'Inhaler',
        brand: 'Ventolin',
        price: 32.99,
        unit: 'piece',
        quantity: 18,
        expiryDate: '2024-09-30',
        batchNo: 'B2024-006',
        manufacturer: 'GSK',
        requiresPrescription: true,
        storageTemp: 'room-temp',
        reorderLevel: 10,
        supplier: 'SUP004'
      },
      {
        id: 'MED007',
        name: 'Atorvastatin 20mg',
        category: 'Cardiovascular',
        type: 'Tablet',
        brand: 'Lipitor',
        price: 22.50,
        unit: 'strip',
        quantity: 120,
        expiryDate: '2025-11-15',
        batchNo: 'B2024-007',
        manufacturer: 'Pfizer',
        requiresPrescription: true,
        storageTemp: 'room-temp',
        reorderLevel: 30,
        supplier: 'SUP005'
      },
      {
        id: 'MED008',
        name: 'Omeprazole 20mg',
        category: 'Gastrointestinal',
        type: 'Capsule',
        brand: 'Losec',
        price: 15.99,
        unit: 'strip',
        quantity: 80,
        expiryDate: '2025-07-22',
        batchNo: 'B2024-008',
        manufacturer: 'AstraZeneca',
        requiresPrescription: false,
        storageTemp: 'room-temp',
        reorderLevel: 25,
        supplier: 'SUP003'
      }
    ];
  }

  getDefaultPrescriptions() {
    return [
      {
        id: 'RX001',
        patientName: 'John Smith',
        patientAge: 45,
        doctorName: 'Dr. Sarah Johnson',
        date: '2024-03-15',
        medicines: [
          { name: 'Amoxicillin 500mg', quantity: 2, instructions: 'Take one capsule three times daily' },
          { name: 'Paracetamol 650mg', quantity: 1, instructions: 'Take one tablet every 6 hours if fever' }
        ],
        status: 'ready',
        filledBy: 'Pharmacist Mike',
        filledDate: '2024-03-15'
      },
      {
        id: 'RX002',
        patientName: 'Emily Davis',
        patientAge: 32,
        doctorName: 'Dr. Michael Chen',
        date: '2024-03-16',
        medicines: [
          { name: 'Cetirizine 10mg', quantity: 1, instructions: 'Take one tablet daily at bedtime' }
        ],
        status: 'filled',
        filledBy: 'Pharmacist Sarah',
        filledDate: '2024-03-16'
      },
      {
        id: 'RX003',
        patientName: 'Robert Wilson',
        patientAge: 58,
        doctorName: 'Dr. Emily Brown',
        date: '2024-03-16',
        medicines: [
          { name: 'Atorvastatin 20mg', quantity: 3, instructions: 'Take one tablet daily' },
          { name: 'Omeprazole 20mg', quantity: 2, instructions: 'Take one capsule before breakfast' }
        ],
        status: 'pending',
        filledBy: null,
        filledDate: null
      },
      {
        id: 'RX004',
        patientName: 'Maria Garcia',
        patientAge: 28,
        doctorName: 'Dr. James Wilson',
        date: '2024-03-14',
        medicines: [
          { name: 'Salbutamol Inhaler', quantity: 1, instructions: 'Use as needed for shortness of breath' }
        ],
        status: 'picked',
        filledBy: 'Pharmacist Mike',
        filledDate: '2024-03-14'
      },
      {
        id: 'RX005',
        patientName: 'David Thompson',
        patientAge: 67,
        doctorName: 'Dr. Lisa Anderson',
        date: '2024-03-15',
        medicines: [
          { name: 'Insulin Glargine', quantity: 2, instructions: 'Inject 20 units at bedtime' },
          { name: 'Amoxiclav 625mg', quantity: 1, instructions: 'Take one tablet twice daily' }
        ],
        status: 'pending',
        filledBy: null,
        filledDate: null
      }
    ];
  }

  getDefaultSuppliers() {
    return [
      {
        id: 'SUP001',
        name: 'PharmaCorp Distributors',
        contact: 'John Doe',
        phone: '+1-800-555-0123',
        email: 'orders@pharmacorp.com',
        address: '123 Industry Blvd, City, State',
        paymentTerms: 'Net 30',
        categories: ['Antibiotics', 'Pain Relief']
      },
      {
        id: 'SUP002',
        name: 'MediLife Supplies',
        contact: 'Jane Smith',
        phone: '+1-800-555-0124',
        email: 'sales@medilife.com',
        address: '456 Medical Dr, City, State',
        paymentTerms: 'Net 15',
        categories: ['Analgesics', 'Antihistamines']
      },
      {
        id: 'SUP003',
        name: 'BioPharma Solutions',
        contact: 'Dr. Robert Chen',
        phone: '+1-800-555-0125',
        email: 'orders@biopharma.com',
        address: '789 Research Park, City, State',
        paymentTerms: 'Net 45',
        categories: ['Biologics', 'Insulin']
      },
      {
        id: 'SUP004',
        name: 'Respiratory Care Inc',
        contact: 'Michael Brown',
        phone: '+1-800-555-0126',
        email: 'orders@respiratorycare.com',
        address: '321 Health Ave, City, State',
        paymentTerms: 'Net 30',
        categories: ['Respiratory', 'Inhalers']
      },
      {
        id: 'SUP005',
        name: 'CardioMed Distributors',
        contact: 'Sarah Wilson',
        phone: '+1-800-555-0127',
        email: 'sales@cardiomed.com',
        address: '654 Heart Lane, City, State',
        paymentTerms: 'Net 30',
        categories: ['Cardiovascular']
      }
    ];
  }

  getDefaultTransactions() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    return [
      {
        id: 'TRX001',
        date: today.toISOString().split('T')[0],
        type: 'sale',
        prescriptionId: 'RX001',
        items: [
          { medicineId: 'MED001', quantity: 2, price: 12.99 },
          { medicineId: 'MED002', quantity: 1, price: 5.99 }
        ],
        total: 31.97,
        paymentMethod: 'Cash',
        customer: 'John Smith'
      },
      {
        id: 'TRX002',
        date: yesterday.toISOString().split('T')[0],
        type: 'sale',
        prescriptionId: 'RX002',
        items: [
          { medicineId: 'MED005', quantity: 1, price: 4.50 }
        ],
        total: 4.50,
        paymentMethod: 'Card',
        customer: 'Emily Davis'
      },
      {
        id: 'TRX003',
        date: twoDaysAgo.toISOString().split('T')[0],
        type: 'purchase',
        supplierId: 'SUP001',
        items: [
          { medicineId: 'MED001', quantity: 100, price: 8.50 },
          { medicineId: 'MED004', quantity: 50, price: 12.00 }
        ],
        total: 1450.00,
        paymentMethod: 'Bank Transfer',
        invoiceNo: 'INV-2024-001'
      }
    ];
  }

  // Utility methods
  getExpiringMedicines(days = 30) {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + days);

    return this.medicines.filter(med => {
      const expiry = new Date(med.expiryDate);
      return expiry <= futureDate && expiry >= today;
    }).sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));
  }

  getLowStockMedicines() {
    return this.medicines.filter(med => med.quantity <= med.reorderLevel);
  }

  getControlledSubstances() {
    // For demo, consider antibiotics and insulin as controlled
    return this.medicines.filter(med => 
      med.category === 'Antibiotic' || med.name.includes('Insulin')
    );
  }

  getTodayPrescriptions() {
    const today = new Date().toISOString().split('T')[0];
    return this.prescriptions.filter(rx => rx.date === today);
  }

  getPendingPrescriptions() {
    return this.prescriptions.filter(rx => rx.status === 'pending');
  }

  calculateDailySales() {
    const today = new Date().toISOString().split('T')[0];
    return this.transactions
      .filter(t => t.type === 'sale' && t.date === today)
      .reduce((sum, t) => sum + t.total, 0);
  }

  calculateMonthlySales() {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return this.transactions
      .filter(t => {
        const date = new Date(t.date);
        return t.type === 'sale' && 
               date.getMonth() === currentMonth && 
               date.getFullYear() === currentYear;
      })
      .reduce((sum, t) => sum + t.total, 0);
  }

  getTopSellingMedicines(limit = 5) {
    const sales = {};
    this.transactions
      .filter(t => t.type === 'sale')
      .forEach(t => {
        t.items.forEach(item => {
          const med = this.medicines.find(m => m.id === item.medicineId);
          if (med) {
            if (!sales[med.id]) {
              sales[med.id] = {
                name: med.name,
                quantity: 0,
                revenue: 0
              };
            }
            sales[med.id].quantity += item.quantity;
            sales[med.id].revenue += item.quantity * item.price;
          }
        });
      });

    return Object.values(sales)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, limit);
  }
}

// Initialize global pharmacy data
const pharmacyData = new PharmacyData();