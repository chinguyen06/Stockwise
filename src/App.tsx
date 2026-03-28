import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  LogOut, 
  Search, 
  Plus, 
  Bell, 
  User,
  Box,
  Cuboid,
  CircleDollarSign,
  AlertTriangle,
  Edit2,
  CheckCircle2,
  Loader2,
  Trash2,
  Zap,
  Lightbulb,
  Globe,
  ChevronRight,
  Image as ImageIcon,
  Upload,
  FileText,
  Receipt
} from 'lucide-react';

// Mock initial data
const initialProducts = [
  {
    id: 1,
    name: 'Premium Headphones',
    sku: 'PH-100',
    category: 'Electronics',
    status: 'Healthy',
    stockLevel: 85,
    price: 299.00,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80'
  },
  {
    id: 2,
    name: 'Ergonomic Chair',
    sku: 'EC-500',
    category: 'Furniture',
    status: 'Low Stock',
    stockLevel: 15,
    price: 450.00,
    image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=100&q=80'
  },
  {
    id: 3,
    name: 'Wireless Mouse',
    sku: 'WM-200',
    category: 'Electronics',
    status: 'Out of Stock',
    stockLevel: 0,
    price: 49.00,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&q=80'
  },
  {
    id: 4,
    name: 'Mechanical Keyboard',
    sku: 'MK-300',
    category: 'Electronics',
    status: 'Healthy',
    stockLevel: 42,
    price: 129.00,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=100&q=80'
  },
  {
    id: 5,
    name: 'React Masterclass Course',
    sku: 'RC-101',
    category: 'Video Course',
    status: 'Healthy',
    stockLevel: 92,
    price: 199.00,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&q=80'
  },
  {
    id: 6,
    name: 'Midjourney Prompts Pack',
    sku: 'MJP-001',
    category: 'AI Prompts',
    status: 'Low Stock',
    stockLevel: 25,
    price: 29.00,
    image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=100&q=80'
  },
  {
    id: 7,
    name: 'SEO Guide eBook',
    sku: 'EB-SEO',
    category: 'eBook',
    status: 'Healthy',
    stockLevel: 78,
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=100&q=80'
  },
  {
    id: 8,
    name: 'Figma UI Kit',
    sku: 'UI-099',
    category: 'Software License',
    status: 'Out of Stock',
    stockLevel: 0,
    price: 89.00,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&q=80'
  },
  {
    id: 9,
    name: 'SaaS Starter Boilerplate',
    sku: 'SB-202',
    category: 'Software License',
    status: 'Healthy',
    stockLevel: 65,
    price: 149.00,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&q=80'
  },
  {
    id: 10,
    name: 'Smart Watch Series 5',
    sku: 'SW-500',
    category: 'Electronics',
    status: 'Healthy',
    stockLevel: 55,
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100&q=80'
  },
  {
    id: 11,
    name: 'Organic Coffee Beans',
    sku: 'CB-001',
    category: 'Food & Beverage',
    status: 'Low Stock',
    stockLevel: 18,
    price: 24.50,
    image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=100&q=80'
  },
  {
    id: 12,
    name: 'Minimalist Desk Lamp',
    sku: 'DL-100',
    category: 'Home & Garden',
    status: 'Healthy',
    stockLevel: 72,
    price: 39.00,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=100&q=80'
  },
  {
    id: 13,
    name: 'Winter Puffer Jacket',
    sku: 'WJ-200',
    category: 'Clothing',
    status: 'Out of Stock',
    stockLevel: 0,
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&q=80'
  },
  {
    id: 14,
    name: 'Moleskine Notebook',
    sku: 'NB-500',
    category: 'Office Supplies',
    status: 'Healthy',
    stockLevel: 150,
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=100&q=80'
  },
  {
    id: 15,
    name: 'Yoga Mat',
    sku: 'YM-001',
    category: 'Other',
    status: 'Low Stock',
    stockLevel: 12,
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=100&q=80'
  }
];

const mockAnalytics = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 2000 },
  { name: 'Apr', revenue: 2780 },
  { name: 'May', revenue: 1890 },
  { name: 'Jun', revenue: 2390 },
  { name: 'Jul', revenue: 3490 },
  { name: 'Aug', revenue: 4200 },
  { name: 'Sep', revenue: 3800 },
  { name: 'Oct', revenue: 4300 },
  { name: 'Nov', revenue: 5100 },
  { name: 'Dec', revenue: 6000 },
];

import { supabase } from './lib/supabase';

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');
  const [isChecking, setIsChecking] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [checkResult, setCheckResult] = useState<null | any>(null);

  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [supplierSearch, setSupplierSearch] = useState('');
  const [supplierPage, setSupplierPage] = useState(1);
  const [showAddSupplier, setShowAddSupplier] = useState(false);
  const [newSupplierData, setNewSupplierData] = useState({
    name: '',
    contact: '',
    phone: '',
    transactionCode: '',
    amount: '',
    suppliedProducts: ''
  });

  useEffect(() => {
    async function fetchData() {
      setIsLoadingProducts(true);
      try {
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*');
        
        const categoryMap = new Map();
        if (categoriesData) {
          categoriesData.forEach(c => categoryMap.set(c.id, c.name));
        }

        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*');
        
        if (productsError) {
          console.error('Error fetching products from Supabase:', productsError);
          setProducts([]);
        } else {
          // Normalize column names to handle variations (e.g., Name vs name, Min Stock vs min_stock)
          const normalizedProducts = (productsData || []).map(p => {
            const catId = p.category_id || p.categoryId || p.category;
            const catName = categoryMap.get(catId) || p.category || p.Category || p.CATEGORY || p.category_name || p.categoryName || p['Category name'] || p['category name'] || 'Uncategorized';
            return {
              ...p,
              id: p.id || p.ID || p.Id,
              name: p.name || p.Name || p.NAME || p['Product Name'] || p['product name'] || '',
              sku: p.sku || p.SKU || p.Sku || '',
              category: catName,
              category_id: catId,
              price: p.price || p.Price || p.PRICE || 0,
              quantity: p.quantity || p.Quantity || p.QUANTITY || p.stock || p.Stock || 0,
              min_stock: p.min_stock || p.minStock || p['Min Stock'] || p['min stock'] || p.Min_Stock || 0,
              expiration_date: p.expiration_date || p.expirationDate || p['Expiration Date'] || p['expiration date'] || null,
              image: p.image || p.Image || p.IMAGE || ''
            };
          });
          setProducts(normalizedProducts);
        }

        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select(`
            order_code,
            order_date,
            total,
            customers(name, email),
            order_items(
              quantity,
              products(name, sku)
            )
          `)
          .order('order_date', { ascending: false });

        if (ordersError) {
          console.error('Error fetching orders from Supabase:', ordersError);
          setOrders([]);
        } else {
          // Normalize orders
          const normalizedOrders = (ordersData || []).map(o => {
            const customerData = Array.isArray(o.customers) ? o.customers[0] : o.customers;
            
            const items = o.order_items || [];
            const hasItems = items.length > 0;
            
            const productNames = hasItems ? items.map((item: any) => {
              const product = Array.isArray(item.products) ? item.products[0] : item.products;
              return product?.name || '';
            }).filter(Boolean).join(', ') : '';
            
            const skus = hasItems ? items.map((item: any) => {
              const product = Array.isArray(item.products) ? item.products[0] : item.products;
              return product?.sku || '';
            }).filter(Boolean).join(', ') : '';
            
            const totalQuantity = hasItems ? items.reduce((sum: number, item: any) => sum + (Number(item.quantity) || 0), 0) : 1;

            return {
              ...o,
              id: o.order_code || o.id || o.ID || o.Id || o['Order ID'] || o.order_id || '',
              customer: (customerData && customerData.name) || o.customer || o.Customer || o['Customer Name'] || o.customer_name || '',
              email: (customerData && customerData.email) || o.email || o.Email || '',
              sku: skus || o.sku || o.SKU || o.Sku || '',
              productName: productNames || o.productName || o.product_name || o['Product Name'] || o.Product || o.product || '',
              quantity: hasItems ? totalQuantity : (o.quantity || o.Quantity || 1),
              date: o.date || o.Date || o.order_date || o.created_at || '',
              total: o.total || o.Total || o.amount || o.Amount || 0,
              status: o.status || o.Status || 'Waiting'
            };
          });
          setOrders(normalizedOrders);
        }

        const { data: suppliersData, error: suppliersError } = await supabase
          .from('suppliers')
          .select(`
            id,
            name,
            contact_email,
            phone,
            supplier_transactions (
              transaction_code,
              transaction_cost,
              created_at
            ),
            supplier_products (
              products (
                name
              )
            )
          `);

        if (suppliersError) {
          console.error('Error fetching suppliers from Supabase:', suppliersError);
          setSuppliers([]);
        } else {
          // Normalize suppliers
          const normalizedSuppliers = (suppliersData || []).map(s => {
            const transactions = s.supplier_transactions || [];
            const hasTransactions = transactions.length > 0;
            
            const products = s.supplier_products || [];
            const suppliedProductsList = products
              .map((sp: any) => sp.products?.name)
              .filter(Boolean)
              .join(', ');
            
            return {
              ...s,
              id: s.id || s.ID || s.Id || s.supplier_id || '',
              name: s.name || s.Name || s['Supplier Name'] || s.supplier_name || '',
              contact: s.contact_email || s.contact || s.Contact || s.email || s.Email || '',
              phone: s.phone || s.Phone || '',
              transactionCode: hasTransactions ? transactions.map((t: any) => t.transaction_code).filter(Boolean).join(', ') : (s.transactionCode || s.transaction_code || s['Transaction Code'] || ''),
              amount: hasTransactions ? transactions.reduce((sum: number, t: any) => sum + (Number(t.transaction_cost) || 0), 0) : (s.amount || s.Amount || s.total || 0),
              suppliedProducts: suppliedProductsList || s.suppliedProducts || s.supplied_products || s['Supplied Products'] || s.products || ''
            };
          });
          setSuppliers(normalizedSuppliers);
        }
      } catch (err: any) {
        console.error('Unexpected error:', err);
        setProducts([]);
        setOrders([]);
        setSuppliers([]);
      } finally {
        setIsLoadingProducts(false);
      }
    }
    fetchData();
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState({ category: 'All', status: 'All' });

  const filteredProducts = products.filter(p => {
    const matchesSearch = String(p.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                          String(p.sku || '').toLowerCase().includes(searchQuery.toLowerCase());
    const productCategory = p.category || 'Uncategorized';
    const matchesCategory = activeFilter.category === 'All' || productCategory === activeFilter.category;
    
    // Calculate status dynamically
    const status = (p.quantity || 0) < (p.min_stock || 0) ? 'Low Stock' : 'Healthy';
    const matchesStatus = activeFilter.status === 'All' || status === activeFilter.status;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const [currentOrderPage, setCurrentOrderPage] = useState(1);
  const ordersPerPage = 5;
  const filteredOrders = orders.filter(o => {
    const matchesSearch = String(o.id || '').toLowerCase().includes(orderSearch.toLowerCase()) || 
                          String(o.customer || '').toLowerCase().includes(orderSearch.toLowerCase()) ||
                          String(o.productName || '').toLowerCase().includes(orderSearch.toLowerCase());
    const matchesStatus = orderStatusFilter === 'All' || o.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });
  const totalOrderPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startOrderIndex = (currentOrderPage - 1) * ordersPerPage;
  const endOrderIndex = startOrderIndex + ordersPerPage;
  const currentOrders = filteredOrders.slice(startOrderIndex, endOrderIndex);

  const filteredSuppliers = suppliers.filter(s => {
    const matchesSearch = String(s.name || '').toLowerCase().includes(supplierSearch.toLowerCase()) ||
                          String(s.contact || '').toLowerCase().includes(supplierSearch.toLowerCase()) ||
                          String(s.transactionCode || '').toLowerCase().includes(supplierSearch.toLowerCase());
    return matchesSearch;
  });
  const suppliersPerPage = 5;
  const totalSupplierPages = Math.ceil(filteredSuppliers.length / suppliersPerPage);
  const currentSuppliers = filteredSuppliers.slice((supplierPage - 1) * suppliersPerPage, supplierPage * suppliersPerPage);

  useEffect(() => {
    setCurrentPage(1);
    setCurrentOrderPage(1);
    setSupplierPage(1);
  }, [searchQuery, activeFilter, orderSearch, orderStatusFilter, supplierSearch]);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevOrderPage = () => {
    if (currentOrderPage > 1) setCurrentOrderPage(currentOrderPage - 1);
  };

  const handleNextOrderPage = () => {
    if (currentOrderPage < totalOrderPages) setCurrentOrderPage(currentOrderPage + 1);
  };

  const handlePrevSupplierPage = () => {
    if (supplierPage > 1) setSupplierPage(supplierPage - 1);
  };

  const handleNextSupplierPage = () => {
    if (supplierPage < totalSupplierPages) setSupplierPage(supplierPage + 1);
  };

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
        
      if (error) {
        console.error('Error deleting product:', error);
        // Fallback to local state
      }
      
      const newProducts = products.filter(p => p.id !== id);
      setProducts(newProducts);
      const newTotalPages = Math.ceil(newProducts.length / productsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    try {
      const quantity = parseInt(editFormData.currentStock) || 0;
      const min_stock = parseInt(editFormData.minStock) || 0;
      const price = parseFloat(editFormData.price) || 0;
      
      const { error } = await supabase
        .from('products')
        .update({
          name: editFormData.name,
          sku: editFormData.sku,
          category: editFormData.category,
          quantity: quantity,
          min_stock: min_stock,
          price: price,
          expiration_date: editFormData.expirationDate || null
        })
        .eq('id', editingProduct.id);
        
      if (error) {
        console.error('Error updating product:', error);
        // Fallback to local state
      }
      
      setProducts(products.map(p => {
        if (p.id === editingProduct.id) {
          return {
            ...p,
            name: editFormData.name,
            sku: editFormData.sku,
            category: editFormData.category,
            quantity: quantity,
            min_stock: min_stock,
            price: price,
            expiration_date: editFormData.expirationDate || null
          };
        }
        return p;
      }));
      setEditingProduct(null);
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  const [editingProduct, setEditingProduct] = useState<null | any>(null);
  const [showAddOrder, setShowAddOrder] = useState(false);
  const [newOrderData, setNewOrderData] = useState({
    customer: '',
    email: '',
    productId: '',
    quantity: '1',
    status: 'Waiting'
  });

  const [addOrderError, setAddOrderError] = useState<string | null>(null);
  const [isAddingOrder, setIsAddingOrder] = useState(false);

  const handleAddOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddOrderError(null);
    setIsAddingOrder(true);
    
    const product = products.find(p => String(p.id) === newOrderData.productId);
    if (!product) {
      setIsAddingOrder(false);
      return;
    }

    const quantity = parseInt(newOrderData.quantity) || 1;
    const total = (product.price || 0) * quantity;

    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 10000) + 1000}`,
      customer: newOrderData.customer,
      customer_name: newOrderData.customer,
      email: newOrderData.email,
      sku: product.sku,
      productName: product.name,
      product_name: product.name,
      quantity: quantity,
      date: new Date().toISOString().split('T')[0],
      order_date: new Date().toISOString(),
      created_at: new Date().toISOString(),
      total: total,
      amount: total,
      status: newOrderData.status
    };

    try {
      const { error } = await supabase
        .from('orders')
        .insert([newOrder]);

      if (error) {
        console.error('Error adding order to Supabase:', error);
        setAddOrderError(`Failed to save to database: ${error.message}`);
        setIsAddingOrder(false);
        return; // Don't add to local state if database fails, as user requested "store all checkout data in the database"
      }
      
      setOrders([newOrder, ...orders]);
      setShowAddOrder(false);
      setNewOrderData({
        customer: '',
        email: '',
        productId: '',
        quantity: '1',
        status: 'Waiting'
      });
    } catch (err: any) {
      console.error('Unexpected error adding order:', err);
      setAddOrderError(`Unexpected error: ${err.message || String(err)}`);
    } finally {
      setIsAddingOrder(false);
    }
  };

  const handleAddSupplier = async (e: React.FormEvent) => {
    e.preventDefault();
    const newSupplier = {
      supplier_code: `SUP-${Math.floor(Math.random() * 900) + 100}`,
      name: newSupplierData.name,
      contact_email: newSupplierData.contact,
      phone: newSupplierData.phone
    };

    try {
      const { data: insertedSupplier, error } = await supabase
        .from('suppliers')
        .insert([newSupplier])
        .select()
        .single();

      if (error) {
        console.error('Error adding supplier to Supabase:', error);
      }
      
      const supplierToAdd = insertedSupplier || {
        ...newSupplier,
        id: Math.random().toString(),
        transactionCode: newSupplierData.transactionCode,
        amount: parseFloat(newSupplierData.amount) || 0,
        suppliedProducts: newSupplierData.suppliedProducts
      };
      
      setSuppliers([supplierToAdd, ...suppliers]);
      setShowAddSupplier(false);
      setNewSupplierData({
        name: '',
        contact: '',
        phone: '',
        transactionCode: '',
        amount: '',
        suppliedProducts: ''
      });
    } catch (err) {
      console.error('Unexpected error adding supplier:', err);
    }
  };

  const [editingOrder, setEditingOrder] = useState<null | any>(null);
  const [editOrderData, setEditOrderData] = useState({
    customer: '',
    email: '',
    status: 'Waiting'
  });

  const handleDeleteOrder = async (id: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', id);
        
      if (error) {
        console.error('Error deleting order:', error);
      }
      
      const newOrders = orders.filter(o => o.id !== id);
      setOrders(newOrders);
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  const handleUpdateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrder) return;
    
    try {
      const { error } = await supabase
        .from('orders')
        .update({
          customer: editOrderData.customer,
          customer_name: editOrderData.customer,
          email: editOrderData.email,
          status: editOrderData.status
        })
        .eq('id', editingOrder.id);
        
      if (error) {
        console.error('Error updating order:', error);
      }
      
      setOrders(orders.map(o => {
        if (o.id === editingOrder.id) {
          return {
            ...o,
            customer: editOrderData.customer,
            email: editOrderData.email,
            status: editOrderData.status
          };
        }
        return o;
      }));
      setEditingOrder(null);
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  const [editingSupplier, setEditingSupplier] = useState<null | any>(null);
  const [editSupplierData, setEditSupplierData] = useState({
    name: '',
    contact: '',
    phone: '',
    transactionCode: '',
    amount: '',
    suppliedProducts: ''
  });

  const handleDeleteSupplier = async (id: string) => {
    try {
      const { error } = await supabase
        .from('suppliers')
        .delete()
        .eq('id', id);
        
      if (error) {
        console.error('Error deleting supplier:', error);
      }
      
      const newSuppliers = suppliers.filter(s => s.id !== id);
      setSuppliers(newSuppliers);
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  const handleUpdateSupplier = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSupplier) return;
    
    try {
      const { error } = await supabase
        .from('suppliers')
        .update({
          name: editSupplierData.name,
          contact_email: editSupplierData.contact,
          phone: editSupplierData.phone
        })
        .eq('id', editingSupplier.id);
        
      if (error) {
        console.error('Error updating supplier:', error);
      }
      
      setSuppliers(suppliers.map(s => {
        if (s.id === editingSupplier.id) {
          return {
            ...s,
            name: editSupplierData.name,
            contact: editSupplierData.contact,
            phone: editSupplierData.phone,
            transactionCode: editSupplierData.transactionCode,
            amount: parseFloat(editSupplierData.amount) || 0,
            suppliedProducts: editSupplierData.suppliedProducts
          };
        }
        return s;
      }));
      setEditingSupplier(null);
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  const [editFormData, setEditFormData] = useState({
    name: '',
    sku: '',
    category: 'Other',
    currentStock: '',
    minStock: '',
    price: '',
    expirationDate: ''
  });

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Other',
    currentStock: '',
    minStock: '',
    price: '',
    image: '',
    expirationDate: ''
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChecking(true);
    setCheckResult(null);

    try {
      const quantity = parseInt(formData.currentStock) || 0;
      const min_stock = parseInt(formData.minStock) || 0;
      const price = parseFloat(formData.price) || 0;

      const newProductData = {
        name: formData.name || 'New Product',
        sku: formData.sku || `SKU-${Math.floor(Math.random() * 1000)}`,
        category: formData.category,
        quantity: quantity,
        min_stock: min_stock,
        price: price,
        expiration_date: formData.expirationDate || null,
        image: formData.image || 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=100&q=80'
      };

      // Insert into Supabase products table
      const { error } = await supabase
        .from('products')
        .insert([newProductData]);

      if (error) {
        console.error('Error adding product:', error);
        // Fallback to local state if Supabase fails (e.g. no keys or table doesn't exist)
        const newProduct = { id: Date.now(), ...newProductData };
        setProducts([newProduct, ...products]);
        
        // Calculate status for the result view
        const status = (newProductData.quantity || 0) < (newProductData.min_stock || 0) ? 'Low Stock' : 'Healthy';
        const healthScore = Math.min(100, Math.round(((newProductData.quantity || 0) / (newProductData.min_stock || 1)) * 50));
        const estDays = Math.round((newProductData.quantity || 0) / 5);
        
        setCheckResult({
          ...newProductData,
          status: status,
          stockLevel: healthScore,
          daysRemaining: estDays
        });
        
        setCurrentPage(1);
        
        // Reset form
        setFormData({
          name: '',
          sku: '',
          category: 'Other',
          currentStock: '',
          minStock: '',
          price: '',
          image: '',
          expirationDate: ''
        });
      } else {
        // Fetch updated list from products to ensure UI is in sync
        const { data: categoriesData } = await supabase.from('categories').select('*');
        const categoryMap = new Map();
        if (categoriesData) {
          categoriesData.forEach(c => categoryMap.set(c.id, c.name));
        }

        const { data: updatedProducts, error: fetchError } = await supabase
          .from('products')
          .select('*');
          
        if (!fetchError && updatedProducts) {
          const normalizedProducts = updatedProducts.map(p => {
            const catId = p.category_id || p.categoryId || p.category;
            const catName = categoryMap.get(catId) || p.category || p.Category || p.CATEGORY || p.category_name || p.categoryName || p['Category name'] || p['category name'] || 'Uncategorized';
            return {
              ...p,
              id: p.id || p.ID || p.Id,
              name: p.name || p.Name || p.NAME || p['Product Name'] || p['product name'] || '',
              sku: p.sku || p.SKU || p.Sku || '',
              category: catName,
              category_id: catId,
              price: p.price || p.Price || p.PRICE || 0,
              quantity: p.quantity || p.Quantity || p.QUANTITY || p.stock || p.Stock || 0,
              min_stock: p.min_stock || p.minStock || p['Min Stock'] || p['min stock'] || p.Min_Stock || 0,
              expiration_date: p.expiration_date || p.expirationDate || p['Expiration Date'] || p['expiration date'] || null,
              image: p.image || p.Image || p.IMAGE || ''
            };
          });
          setProducts(normalizedProducts);
        } else {
          // Fallback to local state update if fetch fails
          setProducts([{ id: Date.now(), ...newProductData }, ...products]);
        }
        
        // Calculate status for the result view
        const status = (newProductData.quantity || 0) < (newProductData.min_stock || 0) ? 'Low Stock' : 'Healthy';
        const healthScore = Math.min(100, Math.round(((newProductData.quantity || 0) / (newProductData.min_stock || 1)) * 50));
        const estDays = Math.round((newProductData.quantity || 0) / 5);
        
        setCheckResult({
          ...newProductData,
          status: status,
          stockLevel: healthScore,
          daysRemaining: estDays
        });
        
        setCurrentPage(1);
        
        // Reset form
        setFormData({
          name: '',
          sku: '',
          category: 'Other',
          currentStock: '',
          minStock: '',
          price: '',
          image: '',
          expirationDate: ''
        });
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setIsChecking(false);
    }
  };

  if (showLanding) {
    return (
      <div className="min-h-screen bg-[#1c1e26] text-white font-sans overflow-y-auto">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 text-white p-1.5 rounded-lg flex items-center justify-center">
              <span className="font-bold text-xl leading-none">S</span>
            </div>
            <span className="font-bold text-xl">StockWise</span>
          </div>
          <button 
            onClick={() => setShowLanding(false)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-indigo-500/20"
          >
            Get Started
          </button>
        </header>

        {/* Hero */}
        <section className="pt-20 pb-32 px-4 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs font-bold mb-8">
            <span className="size-2 rounded-full bg-indigo-500"></span>
            V2.0 is now live
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Inventory<br />Management,<br />Reimagined.
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            A minimal AI-powered system that transforms complex workflows into clear, glowing, effortless structures — helping you ship faster.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setShowLanding(false)}
              className="w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
            >
              Get Started Free
              <ChevronRight size={18} />
            </button>
            <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl text-sm font-bold transition-all">
              Watch Demo
            </button>
          </div>
        </section>

        {/* Abstract Image */}
        <div className="max-w-5xl mx-auto px-4 mb-32">
          <div className="aspect-square md:aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1e26] via-transparent to-transparent z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
              alt="Abstract glowing waves" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Features */}
        <section className="max-w-5xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Master Your Supply Chain</h2>
            <p className="text-slate-400">Everything you need to scale your operations globally.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors">
              <div className="size-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Real-time Tracking</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Monitor every movement in your warehouse with millisecond precision. Instant updates across all devices.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors">
              <div className="size-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-6">
                <Lightbulb size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Smart Alerts</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Predictive analytics that notify you before stock runs low, leveraging historical data for perfect timing.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors">
              <div className="size-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Global Sync</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Seamlessly integrate with Shopify, Amazon, and ERP systems. One source of truth for your entire brand.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-4 py-32 text-center">
          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 md:p-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to optimize?</h2>
            <p className="text-slate-400 mb-10 text-lg">
              Join 10,000+ businesses scaling faster with StockWise.
            </p>
            <div className="flex flex-col gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your work email" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              <button 
                onClick={() => setShowLanding(false)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20"
              >
                Get Started
              </button>
              <p className="text-xs text-slate-500 mt-4">
                Free 14-day trial. No credit card required.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12 px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-white text-black p-1 rounded flex items-center justify-center">
                <span className="font-bold text-xs leading-none">S</span>
              </div>
              <span className="font-bold text-sm">StockWise</span>
              <span className="text-slate-500 text-sm ml-4">© 2024 All rights reserved.</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
  
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-[#101822] font-sans text-slate-900 dark:text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-[#0A192F] relative text-white shrink-0">
        <div 
          className="p-6 flex items-center gap-3 relative z-10 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => setShowLanding(true)}
        >
          <div className="bg-blue-500 text-white p-2 rounded-xl flex items-center justify-center">
            <Package size={24} />
          </div>
          <div>
            <h1 className="font-bold text-xl leading-tight">StockWise</h1>
            <p className="text-xs text-blue-200 font-medium">Digital Product Checker</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 relative z-10 mt-4">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'dashboard' ? 'bg-white/10 text-white font-semibold' : 'text-blue-200 hover:bg-white/5'}`}>
            <LayoutDashboard size={20} />
            <span className="text-sm">Dashboard</span>
          </button>
          <button onClick={() => setActiveTab('add-product')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'add-product' ? 'bg-white/10 text-white font-semibold' : 'text-blue-200 hover:bg-white/5'}`}>
            <CheckCircle2 size={20} />
            <span className="text-sm">Add Product</span>
          </button>
          <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'orders' ? 'bg-white/10 text-white font-semibold' : 'text-blue-200 hover:bg-white/5'}`}>
            <ShoppingCart size={20} />
            <span className="text-sm">Orders</span>
          </button>
          <button onClick={() => setActiveTab('suppliers')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'suppliers' ? 'bg-white/10 text-white font-semibold' : 'text-blue-200 hover:bg-white/5'}`}>
            <Box size={20} />
            <span className="text-sm">Suppliers</span>
          </button>
          <button onClick={() => setActiveTab('analytics')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'analytics' ? 'bg-white/10 text-white font-semibold' : 'text-blue-200 hover:bg-white/5'}`}>
            <BarChart3 size={20} />
            <span className="text-sm">Analytics</span>
          </button>
        </nav>
        
        <div className="p-4 border-t border-white/10 relative z-10">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-blue-200 hover:bg-white/5 transition-colors">
            <Settings size={20} />
            <span className="text-sm">Settings</span>
          </button>
          <button className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-blue-200 hover:bg-white/5 transition-colors mt-2">
            <LogOut size={20} />
            <span className="text-sm font-semibold">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#101822]/80 backdrop-blur-md flex items-center justify-between px-8 z-10 shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search inventory, orders..." 
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-500 outline-none text-slate-900 dark:text-white"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('add-product')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-md shadow-blue-500/20 whitespace-nowrap"
            >
              <Plus size={18} />
              Add Product
            </button>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
            <button className="size-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-colors shrink-0">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#101822]"></span>
            </button>
            <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden ring-2 ring-slate-100 dark:ring-slate-800 flex items-center justify-center cursor-pointer shrink-0">
              <User size={20} className="text-slate-500" />
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {activeTab === 'add-product' && (
            <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Add New Product</h2>
                  <p className="text-slate-500 dark:text-slate-400">Add a new digital product (eBooks, courses, prompts) to your inventory and forecast demand.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Input Form */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                      <Box className="text-blue-500" size={20} />
                      Product Details
                    </h3>
                    <form onSubmit={handleCheck} className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Product Image</label>
                        <div className="flex items-center gap-4">
                          {formData.image ? (
                            <img src={formData.image} alt="Preview" className="w-16 h-16 rounded-xl object-cover border border-slate-200 dark:border-slate-700" />
                          ) : (
                            <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400">
                              <ImageIcon size={24} />
                            </div>
                          )}
                          <div className="flex-1">
                            <label className="cursor-pointer flex items-center justify-center w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                              <Upload size={16} className="mr-2" />
                              Upload Image
                              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                            </label>
                            <p className="text-xs text-slate-500 mt-2">Recommended size: 400x400px</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Product Name</label>
                          <input 
                            required
                            type="text" 
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="e.g. Wireless Mouse"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">SKU</label>
                          <input 
                            required
                            type="text" 
                            value={formData.sku}
                            onChange={e => setFormData({...formData, sku: e.target.value})}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="e.g. WM-200"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Category</label>
                        <select 
                          value={formData.category}
                          onChange={e => setFormData({...formData, category: e.target.value})}
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        >
                          <option>Other</option>
                          <option>Electronics</option>
                          <option>Clothing</option>
                          <option>Office Supplies</option>
                          <option>Food & Beverage</option>
                          <option>Home & Garden</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Available Stocks</label>
                          <input 
                            required
                            type="number" 
                            min="0"
                            value={formData.currentStock}
                            onChange={e => setFormData({...formData, currentStock: e.target.value})}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="e.g. 500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Min Stock Level</label>
                          <input 
                            required
                            type="number" 
                            min="0"
                            value={formData.minStock}
                            onChange={e => setFormData({...formData, minStock: e.target.value})}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="e.g. 15"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Unit Price ($)</label>
                          <input 
                            required
                            type="number" 
                            step="0.01"
                            min="0"
                            value={formData.price}
                            onChange={e => setFormData({...formData, price: e.target.value})}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="e.g. 49.99"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Expiration Date (Optional)</label>
                          <input 
                            type="date" 
                            value={formData.expirationDate}
                            onChange={e => setFormData({...formData, expirationDate: e.target.value})}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <button 
                        type="submit" 
                        disabled={isChecking}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 mt-4"
                      >
                        {isChecking ? (
                          <>
                            <Loader2 className="animate-spin" size={20} />
                            Adding Product...
                          </>
                        ) : (
                          'Add Product'
                        )}
                      </button>
                    </form>
                  </div>

                  {/* Results Section */}
                  <div className="flex flex-col h-full">
                    {!isChecking && !checkResult && (
                      <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 min-h-[300px]">
                        <BarChart3 size={48} className="text-slate-300 dark:text-slate-700 mb-4" />
                        <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">Ready to Add</h4>
                        <p className="text-sm text-slate-500 max-w-xs">Fill out the form and click Add Product to update your inventory.</p>
                      </div>
                    )}

                    {isChecking && (
                      <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm min-h-[300px]">
                        <div className="relative mb-6">
                          <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
                          <Loader2 className="animate-spin text-blue-500 relative z-10" size={48} />
                        </div>
                        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Processing Analytics</h4>
                        <p className="text-sm text-slate-500">Calculating run rates and projecting stock depletion...</p>
                      </div>
                    )}

                    {checkResult && !isChecking && (
                      <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 animate-in zoom-in-95 duration-500">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                          <BarChart3 className="text-blue-500" size={20} />
                          Analysis Results
                        </h3>
                        
                        <div className="space-y-6">
                          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                            <div>
                              <p className="text-sm text-slate-500 mb-1">Health Score</p>
                              <div className="flex items-end gap-2">
                                <span className="text-4xl font-bold text-slate-900 dark:text-white">{checkResult.stockLevel}</span>
                                <span className="text-sm text-slate-500 mb-1.5">/ 100</span>
                              </div>
                            </div>
                            <div className={`size-16 rounded-full flex items-center justify-center border-4 ${
                              checkResult.status === 'Healthy' ? 'border-emerald-500 text-emerald-500' : 
                              checkResult.status === 'Low Stock' ? 'border-amber-500 text-amber-500' : 
                              'border-rose-500 text-rose-500'
                            }`}>
                              <span className="font-bold text-lg">{checkResult.stockLevel}%</span>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-sm font-medium mb-2">
                              <span className="text-slate-700 dark:text-slate-300">Stock Status</span>
                              <span className={`${
                                checkResult.status === 'Healthy' ? 'text-emerald-500' : 
                                checkResult.status === 'Low Stock' ? 'text-amber-500' : 
                                'text-rose-500'
                              }`}>{checkResult.status}</span>
                            </div>
                            <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-1000 ${
                                  checkResult.status === 'Healthy' ? 'bg-emerald-500' : 
                                  checkResult.status === 'Low Stock' ? 'bg-amber-500' : 
                                  'bg-rose-500'
                                }`}
                                style={{ width: `${checkResult.stockLevel}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                              <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-semibold">Est. Depletion</p>
                              <p className="text-xl font-bold text-slate-900 dark:text-white">{checkResult.daysRemaining} Days</p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                              <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-semibold">Action Required</p>
                              <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                                {checkResult.status === 'Healthy' ? 'Monitor' : 
                                 checkResult.status === 'Low Stock' ? 'Restock Soon' : 
                                 'Urgent Restock'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
          )}

          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* Summary Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Inventory Overview</h2>
                  <p className="text-slate-500 text-sm mt-1">Real-time tracking of your digital assets and licenses</p>
                </div>
                <div className="flex gap-3 relative">
                  <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">Export Data</button>
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm ${showFilters ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    Filters
                  </button>
                  
                  {/* Filters Dropdown */}
                  {showFilters && (
                    <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-20 p-4 animate-in fade-in slide-in-from-top-2">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-3">Filter Products</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Category</label>
                          <select 
                            value={activeFilter.category}
                            onChange={(e) => setActiveFilter({...activeFilter, category: e.target.value})}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white"
                          >
                            <option value="All">All Categories</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Office Supplies">Office Supplies</option>
                            <option value="Food & Beverage">Food & Beverage</option>
                            <option value="Home & Garden">Home & Garden</option>
                            <option value="Software License">Software License</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Status</label>
                          <select 
                            value={activeFilter.status}
                            onChange={(e) => setActiveFilter({...activeFilter, status: e.target.value})}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white"
                          >
                            <option value="All">All Statuses</option>
                            <option value="Healthy">Healthy</option>
                            <option value="Low Stock">Low Stock</option>
                            <option value="Out of Stock">Out of Stock</option>
                          </select>
                        </div>
                        
                        <button 
                          onClick={() => {
                            setActiveFilter({ category: 'All', status: 'All' });
                            setSearchQuery('');
                          }}
                          className="w-full py-2 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium transition-colors"
                        >
                          Clear Filters
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-[#0A192F] p-6 rounded-2xl border border-white/10 shadow-lg relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                    <Box size={80} />
                  </div>
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className="size-10 rounded-xl bg-white/10 text-white flex items-center justify-center backdrop-blur-sm">
                      <Box size={20} />
                    </div>
                    <span className="text-emerald-400 text-xs font-bold bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded-lg">+12%</span>
                  </div>
                  <p className="text-blue-200/70 text-sm font-medium mb-1 relative z-10">Total Products</p>
                  <h3 className="text-2xl font-bold text-white relative z-10">{products.length}</h3>
                </div>

                <div className="bg-gradient-to-br from-rose-900 via-slate-900 to-[#0A192F] p-6 rounded-2xl border border-white/10 shadow-lg relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                    <AlertTriangle size={80} />
                  </div>
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className="size-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center backdrop-blur-sm">
                      <AlertTriangle size={20} />
                    </div>
                    {products.filter(p => p.expiration_date && new Date(p.expiration_date) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).length > 0 && (
                      <span className="text-rose-400 text-xs font-bold bg-rose-400/10 border border-rose-400/20 px-2.5 py-1 rounded-lg">Action Needed</span>
                    )}
                  </div>
                  <p className="text-rose-200/70 text-sm font-medium mb-1 relative z-10">Expiration Alerts (30 Days)</p>
                  <h3 className="text-2xl font-bold text-white relative z-10">
                    {products.filter(p => p.expiration_date && new Date(p.expiration_date) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).length}
                  </h3>
                </div>

                <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-[#0A192F] p-6 rounded-2xl border border-white/10 shadow-lg relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                    <CircleDollarSign size={80} />
                  </div>
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className="size-10 rounded-xl bg-white/10 text-white flex items-center justify-center backdrop-blur-sm">
                      <CircleDollarSign size={20} />
                    </div>
                    <span className="text-rose-400 text-xs font-bold bg-rose-400/10 border border-rose-400/20 px-2.5 py-1 rounded-lg">-2.4%</span>
                  </div>
                  <p className="text-blue-200/70 text-sm font-medium mb-1 relative z-10">Inventory Value</p>
                  <h3 className="text-2xl font-bold text-white relative z-10">
                    ${products.reduce((acc, p) => acc + (Number(p.quantity || 0) * Number(p.price || 0)), 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </h3>
                </div>

                <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-[#0A192F] p-6 rounded-2xl border border-white/10 shadow-lg relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                    <AlertTriangle size={80} />
                  </div>
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className="size-10 rounded-xl bg-white/10 text-white flex items-center justify-center backdrop-blur-sm">
                      <AlertTriangle size={20} />
                    </div>
                    <span className="text-slate-300 text-xs font-bold bg-white/10 border border-white/10 px-2.5 py-1 rounded-lg">Stable</span>
                  </div>
                  <p className="text-blue-200/70 text-sm font-medium mb-1 relative z-10">Low Stock Alerts</p>
                  <h3 className="text-2xl font-bold text-white relative z-10">
                    {products.filter(p => (p.quantity || 0) < (p.min_stock || 0)).length}
                  </h3>
                </div>
              </div>

              {/* Table Section */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
                <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">All Products</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                        <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">Product</th>
                        <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">SKU</th>
                        <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">Category</th>
                        <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">Category ID</th>
                        <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">Quantity</th>
                        <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">Min Stock</th>
                        <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">Price</th>
                        <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">Expiration</th>
                        <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 text-center">Status</th>
                        <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:border-slate-800">
                      {isLoadingProducts ? (
                        <tr>
                          <td colSpan={10} className="px-6 py-12 text-center">
                            <div className="flex flex-col items-center justify-center">
                              <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-4" />
                              <p className="text-slate-500 dark:text-slate-400 font-medium">Loading products from Supabase...</p>
                            </div>
                          </td>
                        </tr>
                      ) : currentProducts.length === 0 ? (
                        <tr>
                          <td colSpan={10} className="px-6 py-12 text-center">
                            <div className="flex flex-col items-center justify-center">
                              <Package className="h-12 w-12 text-slate-300 dark:text-slate-600 mb-4" />
                              <p className="text-slate-500 dark:text-slate-400 font-medium">No products found in your database.</p>
                              <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Add some products to your Supabase 'products' table.</p>
                            </div>
                          </td>
                        </tr>
                      ) : currentProducts.map((product) => {
                        const status = (product.quantity || 0) < (product.min_stock || 0) ? 'Low Stock' : 'Healthy';
                        return (
                        <tr key={product.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="size-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0">
                                {product.image ? (
                                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                ) : (
                                  <Package className="text-slate-400" size={20} />
                                )}
                              </div>
                              <span className="text-sm font-bold text-slate-900 dark:text-white">{product.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 font-medium">{product.sku}</td>
                          <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                              {product.category || 'Uncategorized'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
                            {product.category_id || '-'}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{product.quantity || 0}</td>
                          <td className="px-6 py-4 text-sm font-medium text-slate-500 dark:text-slate-400">{product.min_stock || 0}</td>
                          <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">${Number(product.price || 0).toFixed(2)}</td>
                          <td className="px-6 py-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                            {product.expiration_date ? new Date(product.expiration_date).toLocaleDateString() : '-'}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-center">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
                                status === 'Healthy' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' : 
                                'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20'
                              }`}>
                                <span className={`size-1.5 rounded-full mr-1.5 ${
                                  status === 'Healthy' ? 'bg-emerald-500' : 
                                  'bg-rose-500'
                                }`}></span>
                                {status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-1">
                              <button 
                                onClick={() => {
                                  setEditingProduct(product);
                                  setEditFormData({
                                    name: product.name,
                                    sku: product.sku,
                                    category: product.category || '',
                                    currentStock: (product.quantity || 0).toString(),
                                    minStock: (product.min_stock || 0).toString(),
                                    price: (product.price || 0).toString(),
                                    expirationDate: product.expiration_date || ''
                                  });
                                }}
                                className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 opacity-0 group-hover:opacity-100 focus:opacity-100"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button 
                                onClick={() => handleDelete(product.id)}
                                className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10 opacity-0 group-hover:opacity-100 focus:opacity-100"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )})}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination Footer */}
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Showing <span className="text-slate-900 dark:text-white font-bold">{filteredProducts.length === 0 ? 0 : startIndex + 1}-{Math.min(endIndex, filteredProducts.length)}</span> of <span className="text-slate-900 dark:text-white font-bold">{filteredProducts.length}</span> products</p>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 text-sm font-medium transition-colors"
                    >
                      Previous
                    </button>
                    <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold text-sm shadow-sm">{currentPage}</button>
                    <button 
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages || totalPages === 0}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 text-sm font-medium transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'suppliers' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Suppliers</h2>
                  <p className="text-slate-500 text-sm mt-1">Manage your product suppliers and vendors</p>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      value={supplierSearch}
                      onChange={(e) => setSupplierSearch(e.target.value)}
                      placeholder="Search suppliers..." 
                      className="w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none text-slate-900 dark:text-white"
                    />
                  </div>
                  <button 
                    onClick={() => setShowAddSupplier(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-md shadow-blue-500/20"
                  >
                    <Plus size={18} />
                    Add Supplier
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
                <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">All Suppliers</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                        <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">Supplier ID</th>
                        <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">Name</th>
                        <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">Contact Email</th>
                        <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">Phone</th>
                        <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">Transaction Code</th>
                        <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">Transaction Cost</th>
                        <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">Products</th>
                        <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:border-slate-800">
                      {currentSuppliers.map((supplier) => (
                        <tr key={supplier.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                          <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">{supplier.id}</td>
                          <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300 font-medium">{supplier.name}</td>
                          <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{supplier.contact}</td>
                          <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{supplier.phone}</td>
                          <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 font-mono">{supplier.transactionCode || '-'}</td>
                          <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">${Number(supplier.amount || 0).toFixed(2)}</td>
                          <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{supplier.suppliedProducts || '-'}</td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-1">
                              <button 
                                onClick={() => {
                                  setEditingSupplier(supplier);
                                  setEditSupplierData({
                                    name: supplier.name,
                                    contact: supplier.contact,
                                    phone: supplier.phone || '',
                                    transactionCode: supplier.transactionCode || '',
                                    amount: (supplier.amount || 0).toString(),
                                    suppliedProducts: supplier.suppliedProducts || ''
                                  });
                                }}
                                className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 opacity-0 group-hover:opacity-100 focus:opacity-100"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button 
                                onClick={() => handleDeleteSupplier(supplier.id)}
                                className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10 opacity-0 group-hover:opacity-100 focus:opacity-100"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Showing <span className="text-slate-900 dark:text-white font-bold">{filteredSuppliers.length === 0 ? 0 : ((supplierPage - 1) * suppliersPerPage) + 1}-{Math.min(supplierPage * suppliersPerPage, filteredSuppliers.length)}</span> of <span className="text-slate-900 dark:text-white font-bold">{filteredSuppliers.length}</span> suppliers</p>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={handlePrevSupplierPage}
                      disabled={supplierPage === 1}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 text-sm font-medium transition-colors"
                    >
                      Previous
                    </button>
                    <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold text-sm shadow-sm">{supplierPage}</button>
                    <button 
                      onClick={handleNextSupplierPage}
                      disabled={supplierPage === totalSupplierPages || totalSupplierPages === 0}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 text-sm font-medium transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Orders Management</h2>
                  <p className="text-slate-500 text-sm mt-1">Track waiting and completed orders</p>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      placeholder="Search orders..." 
                      className="w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none text-slate-900 dark:text-white"
                    />
                  </div>
                  <select 
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white"
                  >
                    <option value="All">All Status</option>
                    <option value="Completed">Completed</option>
                    <option value="Waiting">Waiting</option>
                  </select>
                  <button 
                    onClick={() => setShowAddOrder(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-md shadow-blue-500/20"
                  >
                    <Plus size={18} />
                    Add Order
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
                <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Recent Orders</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                        <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">Customer</th>
                        <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">Email</th>
                        <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">Order ID</th>
                        <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">SKU</th>
                        <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">Product Name</th>
                        <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">Quantity</th>
                        <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">Date</th>
                        <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">Total</th>
                        <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 text-center">Status</th>
                        <th className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:border-slate-800">
                      {currentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                          <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300 font-medium">{order.customer}</td>
                          <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{order.email || 'N/A'}</td>
                          <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">{order.id}</td>
                          <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{order.sku}</td>
                          <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{order.productName}</td>
                          <td className="px-6 py-4 text-sm text-slate-900 dark:text-white font-medium">{order.quantity}</td>
                          <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{order.date}</td>
                          <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">${Number(order.total || 0).toFixed(2)}</td>
                          <td className="px-6 py-4">
                            <div className="flex justify-center">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
                                order.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' : 
                                'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20'
                              }`}>
                                <span className={`size-1.5 rounded-full mr-1.5 ${
                                  order.status === 'Completed' ? 'bg-emerald-500' : 'bg-amber-500'
                                }`}></span>
                                {order.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-1">
                              <button 
                                onClick={() => {
                                  setEditingOrder(order);
                                  setEditOrderData({
                                    customer: order.customer,
                                    email: order.email || '',
                                    status: order.status
                                  });
                                }}
                                className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 opacity-0 group-hover:opacity-100 focus:opacity-100"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button 
                                onClick={() => handleDeleteOrder(order.id)}
                                className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10 opacity-0 group-hover:opacity-100 focus:opacity-100"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination Footer */}
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Showing <span className="text-slate-900 dark:text-white font-bold">{filteredOrders.length === 0 ? 0 : startOrderIndex + 1}-{Math.min(endOrderIndex, filteredOrders.length)}</span> of <span className="text-slate-900 dark:text-white font-bold">{filteredOrders.length}</span> orders</p>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={handlePrevOrderPage}
                      disabled={currentOrderPage === 1}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 text-sm font-medium transition-colors"
                    >
                      Previous
                    </button>
                    <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold text-sm shadow-sm">{currentOrderPage}</button>
                    <button 
                      onClick={handleNextOrderPage}
                      disabled={currentOrderPage === totalOrderPages || totalOrderPages === 0}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 text-sm font-medium transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Revenue Analytics</h2>
                  <p className="text-slate-500 text-sm mt-1">Monthly revenue and performance metrics</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Revenue (YTD)</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">$41,050</h3>
                  <p className="text-sm text-emerald-500 font-medium mt-2">+15.3% from last year</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Average Order Value</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">$124.50</h3>
                  <p className="text-sm text-emerald-500 font-medium mt-2">+2.1% from last month</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Conversion Rate</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">3.2%</h3>
                  <p className="text-sm text-rose-500 font-medium mt-2">-0.4% from last month</p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Monthly Revenue</h3>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockAnalytics} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dx={-10} tickFormatter={(value) => `$${value}`} />
                      <Tooltip 
                        cursor={{ fill: '#f1f5f9', opacity: 0.1 }}
                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                        itemStyle={{ color: '#38bdf8' }}
                      />
                      <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Add Supplier Modal */}
        {showAddSupplier && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-bold text-lg flex items-center gap-2 text-slate-900 dark:text-white">
                  <Box className="text-blue-500" size={20} />
                  Add New Supplier
                </h3>
                <button onClick={() => setShowAddSupplier(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                  <Plus className="rotate-45" size={24} />
                </button>
              </div>
              <form onSubmit={handleAddSupplier} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Supplier Name</label>
                  <input 
                    required
                    type="text" 
                    value={newSupplierData.name}
                    onChange={e => setNewSupplierData({...newSupplierData, name: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                    placeholder="e.g. TechSource Inc."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Contact Email</label>
                    <input 
                      required
                      type="email" 
                      value={newSupplierData.contact}
                      onChange={e => setNewSupplierData({...newSupplierData, contact: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                      placeholder="e.g. contact@techsource.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Phone Number</label>
                    <input 
                      required
                      type="text" 
                      value={newSupplierData.phone}
                      onChange={e => setNewSupplierData({...newSupplierData, phone: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                      placeholder="e.g. +1 234-567-8900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Transaction Code</label>
                    <input 
                      required
                      type="text" 
                      value={newSupplierData.transactionCode}
                      onChange={e => setNewSupplierData({...newSupplierData, transactionCode: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                      placeholder="e.g. TXN-S004"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Transaction Cost ($)</label>
                    <input 
                      required
                      type="number" 
                      step="0.01"
                      min="0"
                      value={newSupplierData.amount}
                      onChange={e => setNewSupplierData({...newSupplierData, amount: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                      placeholder="e.g. 1500.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Supplied Products</label>
                  <input 
                    required
                    type="text" 
                    value={newSupplierData.suppliedProducts}
                    onChange={e => setNewSupplierData({...newSupplierData, suppliedProducts: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                    placeholder="e.g. Keyboards, Mice"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setShowAddSupplier(false)}
                    className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-bold transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-blue-500/20"
                  >
                    Add Supplier
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Order Modal */}
        {showAddOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-bold text-lg flex items-center gap-2 text-slate-900 dark:text-white">
                  <ShoppingCart className="text-blue-500" size={20} />
                  Add New Order
                </h3>
                <button onClick={() => setShowAddOrder(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                  <Plus className="rotate-45" size={24} />
                </button>
              </div>
              <form onSubmit={handleAddOrder} className="p-6 space-y-5">
                {addOrderError && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-3 rounded-xl text-sm flex items-start gap-2">
                    <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                    <span>{addOrderError}</span>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Customer Name</label>
                    <input 
                      required
                      type="text" 
                      value={newOrderData.customer}
                      onChange={e => setNewOrderData({...newOrderData, customer: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
                    <input 
                      type="email" 
                      value={newOrderData.email}
                      onChange={e => setNewOrderData({...newOrderData, email: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                      placeholder="e.g. john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Product</label>
                  <select 
                    required
                    value={newOrderData.productId}
                    onChange={e => setNewOrderData({...newOrderData, productId: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                  >
                    <option value="" disabled>Select a product...</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.sku}) - ${Number(p.price || 0).toFixed(2)}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Quantity</label>
                    <input 
                      required
                      type="number" 
                      min="1"
                      value={newOrderData.quantity}
                      onChange={e => setNewOrderData({...newOrderData, quantity: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Status</label>
                    <select 
                      value={newOrderData.status}
                      onChange={e => setNewOrderData({...newOrderData, status: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                    >
                      <option value="Waiting">Waiting</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setShowAddOrder(false)}
                    className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isAddingOrder}
                    className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isAddingOrder ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Add Order'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Product Modal */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-bold text-lg flex items-center gap-2 text-slate-900 dark:text-white">
                  <Edit2 className="text-blue-500" size={20} />
                  Edit Product
                </h3>
                <button onClick={() => setEditingProduct(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                  <Plus className="rotate-45" size={24} />
                </button>
              </div>
              <form onSubmit={handleUpdateProduct} className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Product Name</label>
                    <input 
                      required
                      type="text" 
                      value={editFormData.name}
                      onChange={e => setEditFormData({...editFormData, name: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">SKU</label>
                    <input 
                      required
                      type="text" 
                      value={editFormData.sku}
                      onChange={e => setEditFormData({...editFormData, sku: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Category</label>
                  <select 
                    value={editFormData.category}
                    onChange={e => setEditFormData({...editFormData, category: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                  >
                    <option>Other</option>
                    <option>Electronics</option>
                    <option>Clothing</option>
                    <option>Office Supplies</option>
                    <option>Food & Beverage</option>
                    <option>Home & Garden</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Quantity</label>
                    <input 
                      required
                      type="number" 
                      min="0"
                      value={editFormData.currentStock}
                      onChange={e => setEditFormData({...editFormData, currentStock: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Min Stock</label>
                    <input 
                      required
                      type="number" 
                      min="0"
                      value={editFormData.minStock}
                      onChange={e => setEditFormData({...editFormData, minStock: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Unit Price ($)</label>
                    <input 
                      required
                      type="number" 
                      step="0.01"
                      min="0"
                      value={editFormData.price}
                      onChange={e => setEditFormData({...editFormData, price: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Expiration Date</label>
                    <input 
                      type="date" 
                      value={editFormData.expirationDate}
                      onChange={e => setEditFormData({...editFormData, expirationDate: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button 
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold py-2.5 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Order Modal */}
        {editingOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-bold text-lg flex items-center gap-2 text-slate-900 dark:text-white">
                  <Edit2 className="text-blue-500" size={20} />
                  Edit Order
                </h3>
                <button onClick={() => setEditingOrder(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                  <Plus className="rotate-45" size={24} />
                </button>
              </div>
              <form onSubmit={handleUpdateOrder} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Customer Name</label>
                  <input 
                    required
                    type="text" 
                    value={editOrderData.customer}
                    onChange={e => setEditOrderData({...editOrderData, customer: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Customer Email</label>
                  <input 
                    type="email" 
                    value={editOrderData.email}
                    onChange={e => setEditOrderData({...editOrderData, email: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Status</label>
                  <select 
                    value={editOrderData.status}
                    onChange={e => setEditOrderData({...editOrderData, status: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                  >
                    <option value="Waiting">Waiting</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button 
                    type="button"
                    onClick={() => setEditingOrder(null)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold py-2.5 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Supplier Modal */}
        {editingSupplier && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-bold text-lg flex items-center gap-2 text-slate-900 dark:text-white">
                  <Edit2 className="text-blue-500" size={20} />
                  Edit Supplier
                </h3>
                <button onClick={() => setEditingSupplier(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                  <Plus className="rotate-45" size={24} />
                </button>
              </div>
              <form onSubmit={handleUpdateSupplier} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Supplier Name</label>
                  <input 
                    required
                    type="text" 
                    value={editSupplierData.name}
                    onChange={e => setEditSupplierData({...editSupplierData, name: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Contact Email</label>
                    <input 
                      required
                      type="email" 
                      value={editSupplierData.contact}
                      onChange={e => setEditSupplierData({...editSupplierData, contact: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Phone Number</label>
                    <input 
                      type="tel" 
                      value={editSupplierData.phone}
                      onChange={e => setEditSupplierData({...editSupplierData, phone: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Transaction Code</label>
                    <input 
                      type="text" 
                      value={editSupplierData.transactionCode}
                      onChange={e => setEditSupplierData({...editSupplierData, transactionCode: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Transaction Cost ($)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      min="0"
                      value={editSupplierData.amount}
                      onChange={e => setEditSupplierData({...editSupplierData, amount: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Supplied Products</label>
                  <input 
                    type="text" 
                    value={editSupplierData.suppliedProducts}
                    onChange={e => setEditSupplierData({...editSupplierData, suppliedProducts: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                    placeholder="e.g. Laptops, Keyboards"
                  />
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button 
                    type="button"
                    onClick={() => setEditingSupplier(null)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold py-2.5 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
