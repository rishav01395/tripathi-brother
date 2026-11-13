import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './src/lib/supabase';
import { 
  ShoppingBag, Store, Phone, MapPin, ShieldCheck, Star, 
  Search, Filter, ArrowUpDown, ChevronRight, MessageCircle, 
  Lock, Settings, Plus, Edit, Trash2, Image as ImageIcon, 
  CheckCircle, AlertCircle, X, Menu, ExternalLink, RefreshCw, 
  Database, Copy, Check, Eye, Package, DollarSign, Layers, Minus,
  SlidersHorizontal, Sparkles, Award, Clock, Share2, Upload
} from 'lucide-react';

// ==========================================
// INITIAL MOCK DATA & CONSTANTS
// ==========================================
const INITIAL_SETTINGS = {
  businessName: "Tripathi Brothers",
  tagline: "Premier Wholesale & Retail Housekeeping Supplies",
  proprietor: "Harshit Tripathi",
  phone: "9522888971",
  whatsappUrl: "https://wa.me/919522888971",
  address: "Tikuriya tola Gali number 8, Dali baba road, Satna, Madhya Pradesh - 485001",
  hours: "Monday - Saturday: 8:00 AM - 8:30 PM (Sunday Open for Wholesale)",
  bannerTitle: "Direct Wholesale & Retail Cleaning Solutions in Satna",
  bannerSubtitle: "Supplying top-grade mops, wipers, brushes, and liquid cleaning supplies across Madhya Pradesh with unmatched quality and pricing.",
  heroImage: "/hero-banner.jpeg"
};

const INITIAL_CATEGORIES = [
  { id: 'cat-1', name: 'Floor Mops', count: 12, image: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=600&auto=format&fit=crop&q=80' },
  { id: 'cat-2', name: 'Floor Wipers', count: 8, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80' },
  { id: 'cat-3', name: 'Kitchen Wipers', count: 6, image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&auto=format&fit=crop&q=80' },
  { id: 'cat-4', name: 'Bathroom Wipers', count: 7, image: 'https://images.unsplash.com/photo-1585670149967-b4f4da88cc9f?w=600&auto=format&fit=crop&q=80' },
  { id: 'cat-5', name: 'Glass Wipers', count: 5, image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=600&auto=format&fit=crop&q=80' },
  { id: 'cat-6', name: 'Cleaning Brushes', count: 15, image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&auto=format&fit=crop&q=80' },
  { id: 'cat-7', name: 'Dusters', count: 10, image: 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?w=600&auto=format&fit=crop&q=80' },
  { id: 'cat-8', name: 'Housekeeping Liquids', count: 9, image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=600&auto=format&fit=crop&q=80' }
];

const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Heavy Duty Industrial Cotton Floor Mop',
    category: 'Floor Mops',
    price: 349,
    mrp: 499,
    inStock: true,
    featured: true,
    description: 'Extra-absorbent heavy-duty cotton yarn refill with heavy steel rod handle. Built for commercial cleaning, hotels, hospitals, and large households in Satna.',
    images: [
      'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-2',
    name: 'Silicon Double-Blade Floor Wiper',
    category: 'Floor Wipers',
    price: 180,
    mrp: 260,
    inStock: true,
    featured: true,
    description: 'Rust-free powder coated handle with dual-foam silicon edge for single-stroke water removal on marble, tile, and concrete floors.',
    images: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-3',
    name: 'Stainless Steel Kitchen Counter Wiper',
    category: 'Kitchen Wipers',
    price: 90,
    mrp: 150,
    inStock: true,
    featured: true,
    description: 'Compact stainless steel body designed specifically for granite kitchen slabs, dining tables, and glass stove tops.',
    images: [
      'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-4',
    name: 'Ergonomic Bathroom Glass & Tile Wiper',
    category: 'Bathroom Wipers',
    price: 120,
    mrp: 199,
    inStock: true,
    featured: false,
    description: 'Lightweight rubber wiper with hanging hook. Perfect for bathroom doors, mirrors, and wet room walls.',
    images: [
      'https://images.unsplash.com/photo-1585670149967-b4f4da88cc9f?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-5',
    name: 'Telescopic Window & Glass Cleaning Wiper',
    category: 'Glass Wipers',
    price: 450,
    mrp: 650,
    inStock: true,
    featured: true,
    description: 'Extendable up to 8 feet with microfiber scrubber sleeve on one side and streak-free squeegee blade on the other.',
    images: [
      'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-6',
    name: 'Heavy PP Bristle Scrubbing Brush',
    category: 'Cleaning Brushes',
    price: 75,
    mrp: 120,
    inStock: true,
    featured: false,
    description: 'Stiff polymer bristles designed for deep scrubbing of bathroom tiles, cement floors, and rugged carpets.',
    images: [
      'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-7',
    name: 'Microfiber Super Dusting Cloth (Pack of 4)',
    category: 'Dusters',
    price: 199,
    mrp: 350,
    inStock: true,
    featured: true,
    description: 'Ultra-soft 400 GSM microfiber cloths that trap dust and polish furniture, cars, and electronics without scratching.',
    images: [
      'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'prod-8',
    name: 'Commercial Floor Cleaner Liquid (5 Litre Jar)',
    category: 'Housekeeping Liquids',
    price: 499,
    mrp: 750,
    inStock: true,
    featured: true,
    description: 'Pheneol-free disinfectant surface cleaner with long-lasting Jasmine fragrance. Kills 99.9% germs. Ideal for offices and homes.',
    images: [
      'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=800&auto=format&fit=crop&q=80'
    ]
  }
];

const stableStringify = (value) => JSON.stringify(value, (_key, item) => {
  if (!item || typeof item !== 'object' || Array.isArray(item)) return item;
  return Object.keys(item).sort().reduce((sorted, key) => {
    sorted[key] = item[key];
    return sorted;
  }, {});
});

export default function TripathiBrothersApp() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'products' | 'categories' | 'contact' | 'admin'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // App Data States (Persisted in localStorage)
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('tb_settings');
    return saved ? { ...INITIAL_SETTINGS, ...JSON.parse(saved) } : INITIAL_SETTINGS;
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('tb_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('tb_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // UI States
  const [priceModeNumerical, setPriceModeNumerical] = useState(true);
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const cartItems = cart
    .map((item) => ({ ...item, product: products.find((product) => product.id === item.productId) }))
    .filter((item) => item.product);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + Number(item.product.price || 0) * item.quantity, 0);

  // Filter & Search States for Products Page
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-low' | 'price-high' | 'name'

  // Admin ERP States
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminUser, setAdminUser] = useState(null);
  const [adminAuthorized, setAdminAuthorized] = useState(false);
  const adminLoggedIn = Boolean(adminUser && adminAuthorized);
  const [adminActiveTab, setAdminActiveTab] = useState('overview'); // 'overview' | 'products' | 'categories' | 'branding' | 'settings' | 'sql'
  const [cloudReady, setCloudReady] = useState(!supabase);
  const [cloudLoadError, setCloudLoadError] = useState('');
  const [cloudContentLoadError, setCloudContentLoadError] = useState('');
  const [cloudRealtimeError, setCloudRealtimeError] = useState('');
  const [cloudSaveStatus, setCloudSaveStatus] = useState('saved');
  const lastCloudContent = useRef({ settings: null, products: null, categories: null });
  
  // Admin Editing States
  const [editingProduct, setEditingProduct] = useState(undefined);
  const [productForm, setProductForm] = useState({ name: '', category: 'Floor Mops', price: '', mrp: '', inStock: true, featured: false, description: '', images: [] });

  useEffect(() => {
    if (!supabase) return undefined;

    let active = true;
    const authListener = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setAdminUser(session?.user || null);
    });

    const loadSiteContent = async () => {
      const { data: sessionResult, error: sessionError } = await supabase.auth.getSession();
      if (!active) return;
      if (sessionError) {
        setCloudLoadError(`Could not check the Supabase session: ${sessionError.message}`);
        setCloudSaveStatus('error');
      } else {
        setAdminUser(sessionResult.session?.user || null);
      }

      const { data, error } = await supabase.from('site_content').select('key, value');
      if (!active) return;
      if (error) {
        const message = `Could not load shared website content: ${error.message}`;
        setCloudLoadError(message);
        setCloudContentLoadError(message);
        setCloudSaveStatus('error');
        setCloudReady(true);
        return;
      }

      setCloudLoadError('');
      setCloudContentLoadError('');
      const content = Object.fromEntries(data.map((row) => [row.key, row.value]));
      lastCloudContent.current = {
        settings: content.settings ? stableStringify(content.settings) : null,
        products: Array.isArray(content.products) ? stableStringify(content.products) : null,
        categories: Array.isArray(content.categories) ? stableStringify(content.categories) : null
      };
      if (content.settings && typeof content.settings === 'object') {
        setSettings((previous) => ({ ...previous, ...content.settings }));
      }
      if (Array.isArray(content.products)) setProducts(content.products);
      if (Array.isArray(content.categories)) setCategories(content.categories);
      setCloudReady(true);
    };

    loadSiteContent();

    const contentChannel = supabase
      .channel('public-site-content')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_content' }, (payload) => {
        const row = payload.new;
        if (!row?.key) return;
        if (row.key === 'settings' && row.value && typeof row.value === 'object') {
          lastCloudContent.current.settings = stableStringify(row.value);
          setSettings((previous) => ({ ...previous, ...row.value }));
        } else if (row.key === 'products' && Array.isArray(row.value)) {
          lastCloudContent.current.products = stableStringify(row.value);
          setProducts(row.value);
        } else if (row.key === 'categories' && Array.isArray(row.value)) {
          lastCloudContent.current.categories = stableStringify(row.value);
          setCategories(row.value);
        }
      })
      .subscribe((status, error) => {
        if (!active) return;
        if (status === 'SUBSCRIBED') {
          setCloudRealtimeError('');
        } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          setCloudRealtimeError(`Live updates could not connect${error?.message ? `: ${error.message}` : '.'}`);
        }
      });

    return () => {
      active = false;
      authListener.data.subscription.unsubscribe();
      supabase.removeChannel(contentChannel);
    };
  }, []);

  useEffect(() => {
    if (!supabase || !cloudReady || !adminUser) {
      setAdminAuthorized(false);
      return undefined;
    }

    let active = true;
    const checkAdminAccess = async () => {
      const { data, error } = await supabase
        .from('site_admins')
        .select('user_id')
        .eq('user_id', adminUser.id)
        .maybeSingle();

      if (!active) return;
      if (error) {
        setCloudLoadError(`Could not verify admin access: ${error.message}`);
        setCloudSaveStatus('error');
        setAdminAuthorized(false);
        return;
      }
      if (!data) {
        setAdminAuthorized(false);
        const { error: signOutError } = await supabase.auth.signOut();
        if (signOutError) setCloudLoadError(`Could not close the unauthorized session: ${signOutError.message}`);
        return;
      }
      setAdminAuthorized(true);
    };

    checkAdminAccess();
    return () => {
      active = false;
    };
  }, [adminUser, cloudReady]);

  // Keep a local copy for fallback and sync authenticated changes to shared storage.
  useEffect(() => {
    try {
      localStorage.setItem('tb_settings', JSON.stringify(settings));
    } catch (error) {
      showToast(`Could not save this browser's settings copy: ${error.message}`);
    }
    if (!supabase || !cloudReady || cloudContentLoadError || !adminAuthorized) return undefined;
    if (lastCloudContent.current.settings === stableStringify(settings)) return undefined;

    setCloudSaveStatus('saving');
    const timeout = window.setTimeout(async () => {
      try {
        setCloudSaveStatus('saving');
        const value = { ...settings };
        if (value.heroImage?.startsWith('data:image/')) {
          value.heroImage = await uploadImageData(value.heroImage, 'hero');
          setSettings((previous) => ({ ...previous, heroImage: value.heroImage }));
        }
        await saveCloudRecord('settings', value);
        lastCloudContent.current.settings = stableStringify(value);
        setCloudSaveStatus('saved');
      } catch (error) {
        setCloudSaveStatus('error');
        showToast(`Could not sync website settings: ${error.message}`);
      }
    }, 500);

    return () => window.clearTimeout(timeout);
  }, [settings, cloudReady, cloudContentLoadError, adminAuthorized]);

  useEffect(() => {
    try {
      localStorage.setItem('tb_categories', JSON.stringify(categories));
    } catch (error) {
      showToast(`Could not save this browser's category copy: ${error.message}`);
    }
    if (!supabase || !cloudReady || cloudContentLoadError || !adminAuthorized) return undefined;
    if (lastCloudContent.current.categories === stableStringify(categories)) return undefined;

    setCloudSaveStatus('saving');
    const timeout = window.setTimeout(async () => {
      try {
        setCloudSaveStatus('saving');
        const value = await uploadImagesInRecords(categories, 'categories');
        if (value !== categories) setCategories(value);
        await saveCloudRecord('categories', value);
        lastCloudContent.current.categories = stableStringify(value);
        setCloudSaveStatus('saved');
      } catch (error) {
        setCloudSaveStatus('error');
        showToast(`Could not sync categories: ${error.message}`);
      }
    }, 500);

    return () => window.clearTimeout(timeout);
  }, [categories, cloudReady, cloudContentLoadError, adminAuthorized]);

  useEffect(() => {
    try {
      localStorage.setItem('tb_products', JSON.stringify(products));
    } catch (error) {
      showToast(`Could not save this browser's product copy: ${error.message}`);
    }
    if (!supabase || !cloudReady || cloudContentLoadError || !adminAuthorized) return undefined;
    if (lastCloudContent.current.products === stableStringify(products)) return undefined;

    setCloudSaveStatus('saving');
    const timeout = window.setTimeout(async () => {
      try {
        setCloudSaveStatus('saving');
        const value = await uploadImagesInRecords(products, 'products');
        if (value !== products) setProducts(value);
        await saveCloudRecord('products', value);
        lastCloudContent.current.products = stableStringify(value);
        setCloudSaveStatus('saved');
      } catch (error) {
        setCloudSaveStatus('error');
        showToast(`Could not sync products: ${error.message}`);
      }
    }, 500);

    return () => window.clearTimeout(timeout);
  }, [products, cloudReady, cloudContentLoadError, adminAuthorized]);

  // Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const saveCloudRecord = async (key, value) => {
    const { error } = await supabase
      .from('site_content')
      .upsert({ key, value, updated_at: new Date().toISOString() });
    if (error) throw error;
  };

  const uploadImageData = async (dataUrl, folder) => {
    if (!supabase) throw new Error('Supabase is not configured.');

    const response = await fetch(dataUrl);
    if (!response.ok) throw new Error('Could not read the selected image.');
    const blob = await response.blob();
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(blob.type)) {
      throw new Error('Only JPG, PNG, and WEBP photos can be uploaded.');
    }
    if (blob.size > 12 * 1024 * 1024) {
      throw new Error('Each uploaded photo must be smaller than 12 MB.');
    }
    const extension = blob.type === 'image/png' ? 'png' : blob.type === 'image/webp' ? 'webp' : 'jpg';
    const path = `${folder}/${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage
      .from('site-media')
      .upload(path, blob, { contentType: blob.type, cacheControl: '31536000' });
    if (error) throw error;
    return supabase.storage.from('site-media').getPublicUrl(path).data.publicUrl;
  };

  const uploadImagesInRecords = async (records, folder) => {
    let changed = false;
    const updatedRecords = await Promise.all(records.map(async (record) => {
      let updated = record;
      if (typeof updated.image === 'string' && updated.image.startsWith('data:image/')) {
        updated = { ...updated, image: await uploadImageData(updated.image, folder) };
        changed = true;
      }
      if (Array.isArray(updated.images)) {
        const images = await Promise.all(updated.images.map((image) => (
          typeof image === 'string' && image.startsWith('data:image/')
            ? uploadImageData(image, folder)
            : image
        )));
        if (images.some((image, index) => image !== updated.images[index])) {
          updated = { ...updated, images };
          changed = true;
        }
      }
      return updated;
    }));
    return changed ? updatedRecords : records;
  };

  const handleAdminLogin = async (event) => {
    event.preventDefault();
    if (!supabase) {
      showToast("Shared admin login is not configured yet. Add the Supabase settings first.");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: adminEmail.trim(),
      password: adminPassword
    });
    if (error || !data.user) {
      showToast(`Admin sign-in failed: ${error?.message || 'No user was returned.'}`);
      return;
    }

    const { data: membership, error: membershipError } = await supabase
      .from('site_admins')
      .select('user_id')
      .eq('user_id', data.user.id)
      .maybeSingle();

    if (membershipError || !membership) {
      const { error: signOutError } = await supabase.auth.signOut();
      showToast(membershipError
        ? `Could not verify admin access: ${membershipError.message}`
        : signOutError
          ? `This account is not authorized and could not be signed out: ${signOutError.message}`
          : "This account is not authorized to manage the website.");
      return;
    }

    setAdminUser(data.user);
    setAdminAuthorized(true);
    setAdminPassword('');
    showToast("Signed in. Website updates will sync for all visitors.");
  };

  // WhatsApp helper
  const openWhatsApp = (productName = '') => {
    let text = `Hello Tripathi Brothers, I am interested in your housekeeping supplies. Please share wholesale/retail pricing and availability.`;
    if (productName) {
      text = `Hello Tripathi Brothers, I am interested in purchasing "${productName}". Please share the best wholesale/retail price and delivery details to Satna store or shipping.`;
    }
    const url = `https://wa.me/91${settings.phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const addToCart = (product) => {
    if (!product.inStock) {
      showToast('This product is currently out of stock.');
      return;
    }

    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.productId === product.id);
      return existingItem
        ? currentCart.map((item) => item.productId === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item)
        : [...currentCart, { productId: product.id, quantity: 1 }];
    });
    showToast(`${product.name} added to cart.`);
  };

  const changeCartQuantity = (productId, change) => {
    setCart((currentCart) => currentCart
      .map((item) => item.productId === productId
        ? { ...item, quantity: item.quantity + change }
        : item)
      .filter((item) => item.quantity > 0));
  };

  const orderCartOnWhatsApp = () => {
    if (cartItems.length === 0) return;

    const itemLines = cartItems.map(({ product, quantity }) => (
      priceModeNumerical
        ? `• ${product.name} × ${quantity} — ₹${Number(product.price || 0) * quantity}`
        : `• ${product.name} × ${quantity}`
    ));
    const message = [
      `Hello ${settings.businessName}, I would like to place an order:`,
      '',
      ...itemLines,
      ...(priceModeNumerical ? ['', `Estimated total: ₹${cartTotal}`] : []),
      '',
      'Please confirm availability and delivery details.',
    ].join('\n');
    const url = `https://wa.me/91${settings.phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleHeroImageUpload = (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast("Please choose an image file.");
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      showToast("Image must be smaller than 12 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => showToast("Could not read the selected image. Please try again.");
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => showToast("This image could not be opened. Please choose another one.");
      image.onload = () => {
        const maxDimension = 1200;
        const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);

        const context = canvas.getContext('2d');
        if (!context) {
          showToast("Could not process this image. Please try another one.");
          return;
        }

        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        setSettings((previous) => ({
          ...previous,
          heroImage: canvas.toDataURL('image/jpeg', 0.75)
        }));
        showToast(supabase
          ? "Hero photo selected. Uploading it for all visitors…"
          : "Hero photo selected. Add Supabase settings to share it with visitors.");
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 font-sans selection:bg-amber-500 selection:text-black">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-amber-600 to-orange-600 text-black font-bold px-5 py-3 rounded-2xl shadow-2xl shadow-amber-500/30 flex items-center gap-3 border border-amber-300 animate-bounce">
          <CheckCircle className="w-5 h-5 text-black" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP CONTACT BAR */}
      <div className="bg-[#121212] border-b border-zinc-800 text-xs sm:text-sm py-2 px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 text-zinc-400">
        <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
          <span className="flex items-center gap-1 text-amber-400 font-medium">
            <MapPin className="w-3.5 h-3.5" /> {settings.address}
          </span>
          <span className="hidden md:inline text-zinc-700">|</span>
          <span className="flex items-center gap-1 hover:text-white transition">
            <Phone className="w-3.5 h-3.5 text-amber-500" /> Prop. {settings.proprietor} (+91 {settings.phone})
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-amber-500/10 text-amber-400 px-2.5 py-0.5 rounded-full border border-amber-500/20 text-xs font-semibold">
            ⭐ 4.9 Rating | 5000+ Happy Customers
          </span>
          <button 
            onClick={() => setActiveTab('admin')} 
            className="text-zinc-400 hover:text-amber-400 transition flex items-center gap-1 font-mono text-xs bg-zinc-900 px-2 py-1 rounded border border-zinc-800"
          >
            <Lock className="w-3 h-3" /> Admin ERP
          </button>
        </div>
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          
          {/* LOGO */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-orange-500 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition">
              <div className="w-full h-full bg-[#0A0A0A] rounded-[14px] flex items-center justify-center font-black text-xl text-amber-400 font-serif tracking-wider">
                TB
              </div>
            </div>
            <div>
              <h1 className="font-bold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-zinc-200 to-amber-400 bg-clip-text text-transparent">
                {settings.businessName}
              </h1>
              <p className="text-[10px] tracking-widest uppercase text-amber-500/80 font-semibold">
                Wholesale & Retail Housekeeping
              </p>
            </div>
          </div>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#121212] p-1.5 rounded-full border border-zinc-800/80">
            {[
              { id: 'home', label: 'Home' },
              { id: 'products', label: 'Products' },
              { id: 'categories', label: 'Categories' },
              { id: 'contact', label: 'Contact & Map' },
              { id: 'admin', label: 'Admin ERP' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold shadow-md shadow-amber-500/20'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 rounded-full border border-zinc-800 bg-[#121212] p-3 text-zinc-200 transition hover:border-amber-500/50 hover:text-amber-400 sm:px-4 sm:py-2.5"
              aria-label={`Open cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="hidden text-sm font-bold sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-black text-black">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => openWhatsApp()}
              className="relative hidden group overflow-hidden rounded-full p-[1px] focus:outline-none sm:block"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600 rounded-full animate-pulse"></span>
              <span className="relative px-5 py-2.5 bg-[#0A0A0A] rounded-full flex items-center gap-2 text-sm font-bold text-emerald-400 group-hover:bg-emerald-950/30 transition">
                <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                Quick WhatsApp
              </span>
            </button>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* MOBILE DROPDOWN */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#121212] border-b border-zinc-800 px-6 py-5 space-y-3 animate-fadeIn">
            {[
              { id: 'home', label: 'Home' },
              { id: 'products', label: 'Products Catalogue' },
              { id: 'categories', label: 'Categories Showcase' },
              { id: 'contact', label: 'Contact & Map Location' },
              { id: 'admin', label: 'Admin ERP Panel' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition ${
                  activeTab === tab.id ? 'bg-amber-500 text-black font-bold' : 'text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
            <button
              onClick={() => openWhatsApp()}
              className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
            >
              <MessageCircle className="w-4 h-4 fill-white" /> Quick WhatsApp Enquiry
            </button>
          </div>
        )}
      </header>

      {/* ========================================== */}
      {/* 1. HOMEPAGE TAB */}
      {/* ========================================== */}
      {activeTab === 'home' && (
        <div className="space-y-20 pb-20">
          
          {/* HERO SECTION */}
          <section className="relative overflow-hidden pt-16 pb-24 px-4 sm:px-8 border-b border-zinc-800 bg-gradient-to-b from-[#121212] via-[#0A0A0A] to-[#0A0A0A]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                  <Sparkles className="w-4 h-4" /> Wholesale & Retail Housekeeping Hub in Satna, MP
                </div>

                <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
                  {settings.bannerTitle.split('in Satna')[0]} <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-600 bg-clip-text text-transparent">in Satna</span>
                </h1>

                <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0">
                  {settings.bannerSubtitle}
                </p>

                {/* TRUST STATS */}
                <div className="grid grid-cols-3 gap-4 py-4 border-y border-zinc-800/80 max-w-lg mx-auto lg:mx-0">
                  <div className="text-center lg:text-left">
                    <div className="text-2xl sm:text-3xl font-black text-amber-400">5000+</div>
                    <div className="text-xs text-zinc-500 font-medium">Happy Clients</div>
                  </div>
                  <div className="text-center lg:text-left border-x border-zinc-800 px-4">
                    <div className="text-2xl sm:text-3xl font-black text-amber-400">100+</div>
                    <div className="text-xs text-zinc-500 font-medium">Quality Products</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-2xl sm:text-3xl font-black text-amber-400">4.9★</div>
                    <div className="text-xs text-zinc-500 font-medium">Google Rating</div>
                  </div>
                </div>

                {/* CTA BUTTONS */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                  <button
                    onClick={() => setActiveTab('products')}
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-black font-extrabold text-sm hover:scale-105 transition-all shadow-xl shadow-amber-500/20 flex items-center gap-2"
                  >
                    View Full Catalogue <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openWhatsApp()}
                    className="px-8 py-4 rounded-full bg-[#141414] border border-amber-500/40 text-amber-400 hover:bg-amber-500/10 font-bold text-sm transition flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-amber-400" /> WhatsApp Wholesale Enquiry
                  </button>
                </div>

              </div>

              {/* HERO SHOWCASE CARD */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-lg bg-gradient-to-b from-zinc-800 to-zinc-900 p-2 rounded-3xl border border-amber-500/30 shadow-2xl shadow-amber-500/10">
                  <div className="relative aspect-[3/2] rounded-2xl overflow-hidden group">
                    <img 
                      src={settings.heroImage || INITIAL_SETTINGS.heroImage}
                      alt="Tripathi Brothers Store" 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* TRUST BADGES SECTION */}
          <section className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Wholesale & Retail Pricing', desc: 'Best rates in Satna for bulk orders and individual retail buyers.', icon: Award },
                { title: 'Premium Durable Quality', desc: 'Industrial grade cotton, high-density foam, and rust-free rods.', icon: ShieldCheck },
                { title: 'Direct Satna Store Dispatch', desc: 'Instant local pickup or prompt delivery across Madhya Pradesh.', icon: Store },
              ].map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-[#121212] border border-zinc-800 hover:border-amber-500/50 transition group">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-zinc-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CATEGORIES SHOWCASE GRID */}
          <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-zinc-800 pb-4">
              <div>
                <span className="text-amber-400 font-semibold text-xs tracking-wider uppercase">Our Product Lines</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold">Explore Housekeeping Categories</h2>
              </div>
              <button 
                onClick={() => setActiveTab('categories')}
                className="text-sm font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 group"
              >
                View All Categories <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {categories.slice(0, 8).map((cat) => (
                <div 
                  key={cat.id}
                  onClick={() => { setSelectedCategoryFilter(cat.name); setActiveTab('products'); }}
                  className="group relative bg-[#121212] rounded-2xl overflow-hidden border border-zinc-800 hover:border-amber-500/50 transition cursor-pointer"
                >
                  <div className="h-40 overflow-hidden relative">
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent"></div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white group-hover:text-amber-400 transition">{cat.name}</h3>
                    <p className="text-xs text-zinc-400 mt-0.5">{cat.count} Products Available</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FEATURED PRODUCTS */}
          <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-zinc-800 pb-4">
              <div>
                <span className="text-amber-400 font-semibold text-xs tracking-wider uppercase">Best Sellers</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold">Featured Wholesale Supplies</h2>
              </div>
              <button 
                onClick={() => setActiveTab('products')}
                className="text-sm font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 group"
              >
                Browse All Products <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.filter(p => p.featured).slice(0, 4).map((product) => (
                <div 
                  key={product.id}
                  className="bg-[#121212] rounded-2xl border border-zinc-800 overflow-hidden hover:border-amber-500/40 transition flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-52 overflow-hidden bg-zinc-900">
                      <img 
                        src={product.images[0] || 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=800&auto=format&fit=crop&q=80'} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-amber-400 border border-amber-500/20">
                        {product.category}
                      </div>
                      <div className={`absolute top-3 right-3 text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                        product.inStock ? 'bg-emerald-500/90 text-black' : 'bg-red-500 text-white'
                      }`}>
                        {product.inStock ? 'In Stock Satna' : 'Out of Stock'}
                      </div>
                    </div>
                    <div className="p-5 space-y-2">
                      <h3 className="font-bold text-white text-base line-clamp-1">{product.name}</h3>
                      <p className="text-xs text-zinc-400 line-clamp-2">{product.description}</p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center justify-between mt-4">
                    <div>
                      {priceModeNumerical ? (
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-black text-amber-400">₹{product.price}</span>
                          {product.mrp && <span className="text-xs text-zinc-500 line-through">₹{product.mrp}</span>}
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                          Get Best Price
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                        className="p-2.5 rounded-xl bg-amber-500 text-black transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
                        title={product.inStock ? 'Add to cart' : 'Out of stock'}
                        aria-label={`Add ${product.name} to cart`}
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setSelectedProductModal(product)}
                        className="p-2.5 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openWhatsApp(product.name)}
                        className="p-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 transition shadow-md shadow-emerald-600/20"
                        title="Enquire on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4 fill-white" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* MAP & STORE LOCATION BANNER */}
          <section className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="bg-gradient-to-r from-zinc-900 via-[#141414] to-zinc-900 rounded-3xl border border-amber-500/30 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-xl">
                <span className="text-amber-400 text-xs font-bold uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  Visit Our Store in Satna
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Tripathi Brothers Headquarters</h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {settings.address}. Drop by for bulk wholesale deals or retail purchases. Open Monday to Saturday.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => setActiveTab('contact')}
                    className="px-6 py-3 rounded-full bg-amber-500 text-black font-bold text-sm hover:bg-amber-400 transition flex items-center gap-2"
                  >
                    View Map & Directions <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openWhatsApp()}
                    className="px-6 py-3 rounded-full bg-zinc-800 text-white font-bold text-sm hover:bg-zinc-700 transition flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-amber-400" /> Call {settings.phone}
                  </button>
                </div>
              </div>
              <div className="w-full md:w-96 h-64 rounded-2xl overflow-hidden border border-amber-500/40 shadow-2xl relative">
                <iframe
                  title="Satna Map"
                  src="https://maps.google.com/maps?q=Tikuriya+tola+Gali+number+8+Dali+baba+road+Satna+Madhya+Pradesh&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter invert contrast-125"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </section>

        </div>
      )}

      {/* ========================================== */}
      {/* 2. PRODUCTS CATALOGUE TAB */}
      {/* ========================================== */}
      {activeTab === 'products' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#121212] p-6 rounded-3xl border border-zinc-800">
            <div>
              <h1 className="text-3xl font-extrabold text-white">Products Catalogue</h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Browse our complete inventory of mops, wipers, brushes, and cleaning liquids.
              </p>
            </div>
            
            {/* PRICE MODE TOGGLE */}
            <div className="flex items-center gap-3 bg-zinc-900 p-2 rounded-2xl border border-zinc-800">
              <span className="text-xs text-zinc-400 font-medium pl-2">Price View:</span>
              <button
                onClick={() => setPriceModeNumerical(!priceModeNumerical)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  priceModeNumerical ? 'bg-amber-500 text-black shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Numerical (₹)
              </button>
              <button
                onClick={() => setPriceModeNumerical(!priceModeNumerical)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  !priceModeNumerical ? 'bg-amber-500 text-black shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Get Best Price
              </button>
            </div>
          </div>

          {/* SEARCH & FILTERS BAR */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search products by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-[#121212] border border-zinc-800 rounded-2xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition"
              />
            </div>

            {/* Category Dropdown Filter */}
            <div className="md:col-span-4">
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="w-full px-4 py-3.5 bg-[#121212] border border-zinc-800 rounded-2xl text-sm text-white focus:outline-none focus:border-amber-500 transition"
              >
                <option value="All">All Categories ({products.length})</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3.5 bg-[#121212] border border-zinc-800 rounded-2xl text-sm text-white focus:outline-none focus:border-amber-500 transition"
              >
                <option value="featured">Sort by: Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

          </div>

          {/* CATEGORY PILL TAGS */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategoryFilter('All')}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition ${
                selectedCategoryFilter === 'All'
                  ? 'bg-amber-500 text-black'
                  : 'bg-[#121212] text-zinc-300 border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              All Items
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryFilter(cat.name)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition ${
                  selectedCategoryFilter === cat.name
                    ? 'bg-amber-500 text-black'
                    : 'bg-[#121212] text-zinc-300 border border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* PRODUCTS GRID */}
          {(() => {
            let filtered = products.filter(p => {
              const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                    p.description.toLowerCase().includes(searchQuery.toLowerCase());
              const matchesCat = selectedCategoryFilter === 'All' || p.category === selectedCategoryFilter;
              return matchesSearch && matchesCat;
            });

            if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
            if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);
            if (sortBy === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));

            if (filtered.length === 0) {
              return (
                <div className="text-center py-20 bg-[#121212] rounded-3xl border border-zinc-800 space-y-4">
                  <Package className="w-16 h-16 text-zinc-600 mx-auto" />
                  <h3 className="text-xl font-bold text-zinc-300">No products found</h3>
                  <p className="text-zinc-500 text-sm">Try adjusting your search query or category filter.</p>
                  <button 
                    onClick={() => { setSearchQuery(''); setSelectedCategoryFilter('All'); }}
                    className="px-6 py-2.5 bg-amber-500 text-black rounded-xl font-bold text-sm"
                  >
                    Reset Filters
                  </button>
                </div>
              );
            }

            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((product) => (
                  <div 
                    key={product.id}
                    className="bg-[#121212] rounded-2xl border border-zinc-800 overflow-hidden hover:border-amber-500/40 transition flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative h-60 overflow-hidden bg-zinc-900 cursor-pointer" onClick={() => setSelectedProductModal(product)}>
                        <img 
                          src={product.images[0] || 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=800&auto=format&fit=crop&q=80'} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-amber-400 border border-amber-500/20">
                          {product.category}
                        </div>
                        <div className={`absolute top-3 right-3 text-[10px] font-extrabold px-2.5 py-1 rounded-md ${
                          product.inStock ? 'bg-emerald-500 text-black' : 'bg-red-500 text-white'
                        }`}>
                          {product.inStock ? 'In Stock Satna Store' : 'Out of Stock'}
                        </div>
                      </div>

                      <div className="p-5 space-y-2">
                        <h3 
                          onClick={() => setSelectedProductModal(product)}
                          className="font-bold text-white text-base hover:text-amber-400 transition cursor-pointer line-clamp-1"
                        >
                          {product.name}
                        </h3>
                        <p className="text-xs text-zinc-400 line-clamp-2">{product.description}</p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 flex items-center justify-between mt-4">
                      <div>
                        {priceModeNumerical ? (
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black text-amber-400">₹{product.price}</span>
                            {product.mrp && <span className="text-xs text-zinc-500 line-through">₹{product.mrp}</span>}
                          </div>
                        ) : (
                          <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20">
                            Get Best Price
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => addToCart(product)}
                          disabled={!product.inStock}
                          className="px-3 py-2.5 rounded-xl bg-amber-500 text-black hover:bg-amber-400 transition disabled:cursor-not-allowed disabled:opacity-40 flex items-center gap-1.5 text-xs font-bold"
                          title={product.inStock ? 'Add to cart' : 'Out of stock'}
                          aria-label={`Add ${product.name} to cart`}
                        >
                          <ShoppingBag className="w-4 h-4" /> Add
                        </button>
                        <button
                          onClick={() => setSelectedProductModal(product)}
                          className="p-2.5 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openWhatsApp(product.name)}
                          className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 transition shadow-md shadow-emerald-600/20 flex items-center gap-1.5 text-xs font-bold"
                          title="Enquire on WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4 fill-white" /> Enquire
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}

        </div>
      )}

      {/* ========================================== */}
      {/* 3. CATEGORIES SHOWCASE TAB */}
      {/* ========================================== */}
      {activeTab === 'categories' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8">
          <div className="bg-[#121212] p-8 rounded-3xl border border-zinc-800 text-center max-w-3xl mx-auto space-y-3">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Specialized Housekeeping Categories
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Wholesale & Retail Product Divisions</h1>
            <p className="text-zinc-400 text-sm">
              We stock comprehensive ranges of cleaning supplies manufactured for durability and heavy-duty usage. Click any category to filter products instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => {
              const count = products.filter(p => p.category === cat.name).length;
              return (
                <div
                  key={cat.id}
                  onClick={() => { setSelectedCategoryFilter(cat.name); setActiveTab('products'); }}
                  className="group bg-[#121212] rounded-2xl border border-zinc-800 hover:border-amber-500/50 transition cursor-pointer overflow-hidden flex flex-col justify-between"
                >
                  <div className="h-52 relative overflow-hidden bg-zinc-900">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent"></div>
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-400 border border-amber-500/20">
                      {count} Items
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition">{cat.name}</h3>
                    <p className="text-xs text-zinc-400">
                      Explore our high-demand {cat.name.toLowerCase()} available for bulk wholesale orders in Satna and retail delivery.
                    </p>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold pt-2">
                      Browse Category <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 4. CONTACT & MAP PAGE TAB */}
      {/* ========================================== */}
      {activeTab === 'contact' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Get in Touch with Harshit Tripathi
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Contact & Satna Store Location</h1>
            <p className="text-zinc-400 text-sm">
              Visit our headquarters or send a direct WhatsApp enquiry for wholesale pricing and orders.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* CONTACT DETAILS CARDS */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-[#121212] p-8 rounded-3xl border border-zinc-800 space-y-6">
                <h3 className="text-xl font-bold text-white border-b border-zinc-800 pb-4">Store Information</h3>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-500 uppercase">Exact Address</h4>
                    <p className="text-sm font-semibold text-white mt-1 leading-relaxed">
                      {settings.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-500 uppercase">Phone & WhatsApp</h4>
                    <p className="text-sm font-semibold text-white mt-1">+91 {settings.phone}</p>
                    <p className="text-xs text-zinc-400">Proprietor: {settings.proprietor}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-500 uppercase">Operating Hours</h4>
                    <p className="text-sm font-semibold text-white mt-1">{settings.hours}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex flex-col gap-3">
                  <button
                    onClick={() => openWhatsApp()}
                    className="w-full py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 hover:opacity-95 transition"
                  >
                    <MessageCircle className="w-5 h-5 fill-white" /> Chat on WhatsApp Now
                  </button>
                  <a
                    href="https://maps.google.com/?q=Tikuriya+tola+Gali+number+8+Dali+baba+road+Satna+Madhya+Pradesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-zinc-800 text-zinc-200 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-700 transition text-sm"
                  >
                    <ExternalLink className="w-4 h-4 text-amber-400" /> Open in Google Maps App
                  </a>
                </div>
              </div>

            </div>

            {/* GOOGLE MAP EMBED & QUICK WHATSAPP FORM */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* GOOGLE MAP IFRAME */}
              <div className="bg-[#121212] p-4 rounded-3xl border border-zinc-800 space-y-4">
                <div className="flex justify-between items-center px-2">
                  <h3 className="font-bold text-white text-sm">Live Location: Tikuriya tola, Dali Baba Road, Satna</h3>
                  <span className="text-xs text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 font-semibold">
                    Pinpoint Accuracy
                  </span>
                </div>
                <div className="w-full h-[380px] rounded-2xl overflow-hidden border border-zinc-800 relative">
                  <iframe
                    title="Tripathi Brothers Satna Map Location"
                    src="https://maps.google.com/maps?q=Tikuriya+tola+Gali+number+8+Dali+baba+road+Satna+Madhya+Pradesh&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0 filter invert contrast-125"
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </div>

              {/* DIRECT ENQUIRY FORM */}
              <div className="bg-[#121212] p-8 rounded-3xl border border-zinc-800 space-y-6">
                <h3 className="text-xl font-bold text-white">Send Direct WhatsApp Enquiry</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target;
                  const name = form.elements['name'].value;
                  const phone = form.elements['phone'].value;
                  const msg = form.elements['msg'].value;
                  const fullText = `Hello Tripathi Brothers, my name is ${name} (Phone: ${phone}). Enquiry: ${msg}`;
                  window.open(`https://wa.me/91${settings.phone}?text=${encodeURIComponent(fullText)}`, '_blank');
                  showToast("Opening WhatsApp with your enquiry...");
                }} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1">Your Name</label>
                      <input 
                        name="name" 
                        required 
                        placeholder="Enter your full name" 
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1">Phone Number</label>
                      <input 
                        name="phone" 
                        required 
                        placeholder="Enter 10-digit mobile number" 
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">Your Enquiry / Requirements</label>
                    <textarea 
                      name="msg" 
                      required 
                      rows="3" 
                      placeholder="Mention quantities, product types (e.g. Cotton Mops, 5L Liquid Cleaner) for wholesale or retail..." 
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 resize-none"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-extrabold rounded-xl shadow-lg shadow-amber-500/20 hover:opacity-95 transition"
                  >
                    Send Enquiry via WhatsApp
                  </button>
                </form>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ========================================== */}
      {/* 5. ADMIN ERP TAB */}
      {/* ========================================== */}
      {activeTab === 'admin' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
          
          {!adminLoggedIn ? (
            /* SUPABASE ADMIN LOGIN SCREEN */
            <div className="max-w-md mx-auto bg-[#121212] p-8 sm:p-10 rounded-3xl border border-zinc-800 shadow-2xl space-y-6 text-center my-12">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
                <Lock className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white">Admin ERP Security Login</h2>
                <p className="text-xs text-zinc-400">Sign in with the admin account configured in Supabase to publish shared website changes.</p>
              </div>

              {!supabase && (
                <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-left text-xs leading-relaxed text-amber-200">
                  Shared publishing is not configured. Add the Supabase URL and publishable key to the Vercel environment variables, then redeploy.
                </p>
              )}
              {cloudLoadError && (
                <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-left text-xs leading-relaxed text-red-200">
                  {cloudLoadError}
                </p>
              )}

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <input
                  type="email"
                  autoComplete="username"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="Admin email"
                  className="w-full px-4 py-3.5 bg-zinc-900 border border-zinc-800 rounded-2xl text-center text-sm text-white focus:outline-none focus:border-amber-500"
                />
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Admin password"
                  className="w-full px-4 py-3.5 bg-zinc-900 border border-zinc-800 rounded-2xl text-center text-sm text-white focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  disabled={!supabase || !cloudReady}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-extrabold rounded-2xl shadow-lg shadow-amber-500/20 hover:opacity-95 transition"
                >
                  {!cloudReady && supabase ? 'Connecting to shared site…' : 'Sign in to Admin Dashboard'}
                </button>
              </form>
            </div>
          ) : (
            /* ADMIN DASHBOARD INTERFACE */
            <div className="space-y-8">
              
              {/* ADMIN HEADER */}
              <div className="bg-[#121212] p-6 rounded-3xl border border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-black font-black flex items-center justify-center text-xl">
                    ERP
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white">Tripathi Brothers Management System</h1>
                    <p className="text-xs text-zinc-400">Proprietor: {settings.proprietor} | Satna Headquarters</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    title={cloudRealtimeError || undefined}
                    className={`text-xs font-semibold ${cloudSaveStatus === 'error' ? 'text-red-400' : cloudSaveStatus === 'saving' || cloudRealtimeError ? 'text-amber-400' : 'text-emerald-400'}`}
                  >
                    {cloudSaveStatus === 'error'
                      ? 'Cloud sync failed'
                      : cloudSaveStatus === 'saving'
                        ? 'Syncing changes…'
                        : cloudRealtimeError
                          ? 'Saved; visitors may need refresh'
                          : 'Shared site up to date'}
                  </span>
                  <button
                  onClick={async () => {
                    const { error } = await supabase.auth.signOut();
                    if (error) {
                      showToast(`Could not sign out: ${error.message}`);
                      return;
                    }
                    setAdminAuthorized(false);
                    setAdminPassword('');
                    showToast("Logged out from Admin ERP.");
                  }}
                  className="px-4 py-2 bg-zinc-800 text-zinc-300 hover:text-white rounded-xl text-xs font-bold transition border border-zinc-700"
                >
                  Lock ERP Session
                </button>
                </div>
              </div>

              {/* ADMIN TABS NAVIGATION */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {[
                  { id: 'overview', label: '📊 Overview & Metrics' },
                  { id: 'products', label: '📦 Product Management (CRUD)' },
                  { id: 'categories', label: '📂 Category Manager' },
                  { id: 'branding', label: '🖼️ Media & Branding' },
                  { id: 'settings', label: '⚙️ Website Settings' },
                  { id: 'sql', label: '🗄️ Supabase SQL Schema' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setAdminActiveTab(tab.id)}
                    className={`px-5 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition ${
                      adminActiveTab === tab.id
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-black shadow-lg shadow-amber-500/20'
                        : 'bg-[#121212] text-zinc-300 border border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* 1. OVERVIEW DASHBOARD */}
              {adminActiveTab === 'overview' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-[#121212] p-6 rounded-3xl border border-zinc-800 space-y-2">
                      <div className="flex justify-between items-center text-zinc-400">
                        <span className="text-xs font-bold uppercase">Total Products</span>
                        <Package className="w-5 h-5 text-amber-400" />
                      </div>
                      <div className="text-3xl font-black text-white">{products.length}</div>
                      <p className="text-xs text-zinc-500">Active inventory items</p>
                    </div>

                    <div className="bg-[#121212] p-6 rounded-3xl border border-zinc-800 space-y-2">
                      <div className="flex justify-between items-center text-zinc-400">
                        <span className="text-xs font-bold uppercase">In Stock (Satna)</span>
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div className="text-3xl font-black text-emerald-400">{products.filter(p => p.inStock).length}</div>
                      <p className="text-xs text-zinc-500">Ready for instant dispatch</p>
                    </div>

                    <div className="bg-[#121212] p-6 rounded-3xl border border-zinc-800 space-y-2">
                      <div className="flex justify-between items-center text-zinc-400">
                        <span className="text-xs font-bold uppercase">Categories</span>
                        <Layers className="w-5 h-5 text-amber-400" />
                      </div>
                      <div className="text-3xl font-black text-white">{categories.length}</div>
                      <p className="text-xs text-zinc-500">Housekeeping lines</p>
                    </div>

                    <div className="bg-[#121212] p-6 rounded-3xl border border-zinc-800 space-y-2">
                      <div className="flex justify-between items-center text-zinc-400">
                        <span className="text-xs font-bold uppercase">Store Status</span>
                        <Store className="w-5 h-5 text-amber-400" />
                      </div>
                      <div className="text-xl font-bold text-amber-400 pt-1">Open & Active</div>
                      <p className="text-xs text-zinc-500">Tikuriya tola, Satna</p>
                    </div>
                  </div>

                  {/* QUICK ACTIONS */}
                  <div className="bg-[#121212] p-8 rounded-3xl border border-zinc-800 space-y-4">
                    <h3 className="text-lg font-bold text-white">Quick Administrative Shortcuts</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <button 
                        onClick={() => setAdminActiveTab('products')}
                        className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 text-left transition group"
                      >
                        <h4 className="font-bold text-white group-hover:text-amber-400">+ Add New Product</h4>
                        <p className="text-xs text-zinc-400 mt-1">Upload item with photo gallery & pricing</p>
                      </button>
                      <button 
                        onClick={() => setAdminActiveTab('settings')}
                        className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 text-left transition group"
                      >
                        <h4 className="font-bold text-white group-hover:text-amber-400">⚙️ Edit Store Info</h4>
                        <p className="text-xs text-zinc-400 mt-1">Update address, phone, or hours</p>
                      </button>
                      <button 
                        onClick={() => setAdminActiveTab('sql')}
                        className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 text-left transition group"
                      >
                        <h4 className="font-bold text-white group-hover:text-amber-400">🗄️ Supabase SQL Export</h4>
                        <p className="text-xs text-zinc-400 mt-1">Copy database schema & migration script</p>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. PRODUCT MANAGEMENT (CRUD) */}
              {adminActiveTab === 'products' && (
                <div className="space-y-6 animate-fadeIn">
                  
                  <div className="flex justify-between items-center bg-[#121212] p-6 rounded-3xl border border-zinc-800">
                    <div>
                      <h2 className="text-xl font-bold text-white">Product Inventory Management</h2>
                      <p className="text-xs text-zinc-400">Add, edit, or remove products and upload multiple photos directly from your device.</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingProduct(null);
                        setProductForm({ name: '', category: categories[0]?.name || 'Floor Mops', price: '', mrp: '', inStock: true, featured: false, description: '', images: [] });
                      }}
                      className="px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-2xl text-xs shadow hover:opacity-95 transition flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Add New Product
                    </button>
                  </div>

                  {/* ADD / EDIT FORM MODAL */}
                  {editingProduct !== undefined && (
                    <div className="bg-[#121212] p-8 rounded-3xl border border-amber-500/40 space-y-6 shadow-2xl">
                      <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                        <h3 className="text-lg font-bold text-amber-400">
                          {editingProduct ? 'Edit Existing Product' : 'Create New Product'}
                        </h3>
                        <button 
                          onClick={() => setEditingProduct(undefined)}
                          className="text-zinc-400 hover:text-white"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <form onSubmit={(e) => {
                        e.preventDefault();
                        if (!productForm.name || !productForm.price) {
                          showToast("Please fill product name and price.");
                          return;
                        }
                        const finalImages = productForm.images.length > 0 
                          ? productForm.images 
                          : ['https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=800&auto=format&fit=crop&q=80'];

                        if (editingProduct) {
                          setProducts(products.map(p => p.id === editingProduct.id ? { ...productForm, images: finalImages, id: p.id, price: Number(productForm.price), mrp: Number(productForm.mrp) } : p));
                          showToast("Product updated successfully!");
                        } else {
                          const newProd = {
                            ...productForm,
                            images: finalImages,
                            id: 'prod-' + Date.now(),
                            price: Number(productForm.price),
                            mrp: Number(productForm.mrp)
                          };
                          setProducts([newProd, ...products]);
                          showToast("New product added successfully!");
                        }
                        setEditingProduct(undefined);
                      }} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-zinc-400 mb-1">Product Name</label>
                            <input
                              type="text"
                              required
                              value={productForm.name}
                              onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                              placeholder="e.g. Industrial Floor Wiper"
                              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-zinc-400 mb-1">Category</label>
                            <select
                              value={productForm.category}
                              onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                            >
                              {categories.map(c => (
                                <option key={c.id} value={c.name}>{c.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-zinc-400 mb-1">Price (₹)</label>
                            <input
                              type="number"
                              required
                              value={productForm.price}
                              onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                              placeholder="349"
                              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-zinc-400 mb-1">MRP (₹)</label>
                            <input
                              type="number"
                              value={productForm.mrp}
                              onChange={(e) => setProductForm({ ...productForm, mrp: e.target.value })}
                              placeholder="499"
                              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-zinc-400 mb-1 font-sans">Product Description</label>
                          <textarea
                            rows="2"
                            value={productForm.description}
                            onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                            placeholder="Describe durability, material, usage..."
                            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 resize-none"
                          ></textarea>
                        </div>

                        {/* LOCAL FILE UPLOADER (MULTIPLE PHOTOS) */}
                        <div className="space-y-3 pt-2">
                          <label className="block text-xs font-medium text-amber-400">
                            📷 Upload Product Photos from Local Device / Mobile Gallery
                          </label>
                          
                          <div className="flex flex-col sm:flex-row items-center gap-4">
                            <label className="w-full sm:w-auto px-5 py-3 bg-zinc-900 hover:bg-zinc-800 border border-dashed border-amber-500/50 rounded-xl text-xs font-bold text-amber-400 cursor-pointer flex items-center justify-center gap-2 transition">
                              <Upload className="w-4 h-4" /> Select Photos from Storage
                              <input
                                type="file"
                                multiple
                                accept="image/jpeg,image/png,image/webp"
                                className="hidden"
                                onChange={(e) => {
                                  const files = Array.from(e.target.files);
                                  e.target.value = '';
                                  const validFiles = files.filter((file) => {
                                    const validType = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
                                    const validSize = file.size <= 12 * 1024 * 1024;
                                    if (!validType || !validSize) {
                                      showToast(`${file.name}: choose JPG, PNG, or WEBP under 12 MB.`);
                                    }
                                    return validType && validSize;
                                  });
                                  validFiles.forEach(file => {
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                      setProductForm(prev => ({
                                        ...prev,
                                        images: [...prev.images, reader.result]
                                      }));
                                    };
                                    reader.readAsDataURL(file);
                                  });
                                  if (validFiles.length > 0) {
                                    showToast(`${validFiles.length} image(s) loaded; they will sync when saved.`);
                                  }
                                }}
                              />
                            </label>
                            <span className="text-xs text-zinc-500">Supports JPG, PNG, WEBP files</span>
                          </div>

                          {/* THUMBNAILS PREVIEW GALLERY */}
                          {productForm.images.length > 0 && (
                            <div className="flex flex-wrap gap-3 pt-2">
                              {productForm.images.map((imgUrl, index) => (
                                <div key={index} className="relative w-20 h-20 rounded-xl overflow-hidden border border-zinc-700 bg-zinc-900 group">
                                  <img src={imgUrl} alt={`Uploaded ${index}`} className="w-full h-full object-cover" />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setProductForm({
                                        ...productForm,
                                        images: productForm.images.filter((_, i) => i !== index)
                                      });
                                    }}
                                    className="absolute inset-0 bg-red-950/80 text-red-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                                  >
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-6 pt-2">
                          <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={productForm.inStock}
                              onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                              className="w-4 h-4 accent-amber-500 rounded"
                            />
                            In Stock Satna Store
                          </label>

                          <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={productForm.featured}
                              onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                              className="w-4 h-4 accent-amber-500 rounded"
                            />
                            Featured Showcase Product
                          </label>
                        </div>

                        <div className="pt-4 flex gap-3">
                          <button
                            type="submit"
                            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-extrabold rounded-xl text-xs shadow hover:opacity-95 transition"
                          >
                            {editingProduct ? 'Save Product Changes' : 'Publish Product to Catalogue'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingProduct(undefined)}
                            className="px-6 py-3 bg-zinc-800 text-zinc-300 font-bold rounded-xl text-xs hover:bg-zinc-700 transition"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* PRODUCTS LIST TABLE / GRID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <div key={product.id} className="bg-[#121212] p-5 rounded-3xl border border-zinc-800 space-y-4 relative group">
                        <div className="h-44 rounded-2xl overflow-hidden bg-zinc-900 relative">
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                          <div className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded ${product.inStock ? 'bg-emerald-500 text-black' : 'bg-red-500 text-white'}`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </div>
                          {product.images.length > 1 && (
                            <div className="absolute bottom-3 right-3 bg-black/80 text-amber-400 text-[10px] px-2 py-0.5 rounded-full font-bold border border-amber-500/30">
                              +{product.images.length - 1} photos
                            </div>
                          )}
                        </div>

                        <div>
                          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">{product.category}</span>
                          <h4 className="font-bold text-white text-sm line-clamp-1">{product.name}</h4>
                          <p className="text-amber-400 font-black text-lg mt-1">₹{product.price} <span className="text-xs text-zinc-500 line-through font-normal">₹{product.mrp}</span></p>
                        </div>

                        <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800/80">
                          <button
                            onClick={() => {
                              setEditingProduct(product);
                              setProductForm({ ...product });
                            }}
                            className="p-2.5 rounded-xl bg-zinc-900 text-amber-400 border border-zinc-800 hover:bg-amber-500/10 transition"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete product "${product.name}"?`)) {
                                setProducts(products.filter(p => p.id !== product.id));
                                showToast("Product deleted successfully.");
                              }
                            }}
                            className="p-2.5 rounded-xl bg-red-950/40 text-red-400 border border-red-900/40 hover:bg-red-900/40 transition"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* 3. CATEGORY MANAGEMENT */}
              {adminActiveTab === 'categories' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex justify-between items-center bg-[#121212] p-6 rounded-3xl border border-zinc-800">
                    <div>
                      <h2 className="text-xl font-bold text-white">Category Management</h2>
                      <p className="text-xs text-zinc-400">Category changes and photos sync to the public site automatically.</p>
                    </div>
                    <label className="px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-2xl text-xs shadow cursor-pointer">
                      + Add Category & Upload Photo
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          e.target.value = '';
                          if (file && !['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
                            showToast("Choose a JPG, PNG, or WEBP image.");
                            return;
                          }
                          if (file && file.size > 12 * 1024 * 1024) {
                            showToast("Category photo must be smaller than 12 MB.");
                            return;
                          }
                          const name = prompt("Enter new category name:");
                          if (name && file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              setCategories((previous) => [...previous, { id: 'cat-' + Date.now(), name, count: 0, image: reader.result }]);
                              showToast(`Category "${name}" added with uploaded image!`);
                            };
                            reader.readAsDataURL(file);
                          } else if (name) {
                            setCategories((previous) => [...previous, { id: 'cat-' + Date.now(), name, count: 0, image: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=600&auto=format&fit=crop&q=80' }]);
                            showToast(`Category "${name}" added!`);
                          }
                        }}
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {categories.map((cat) => (
                      <div key={cat.id} className="bg-[#121212] p-6 rounded-3xl border border-zinc-800 space-y-4">
                        <div className="h-32 rounded-2xl overflow-hidden relative">
                          <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-bold text-white text-base">{cat.name}</h3>
                            <p className="text-xs text-zinc-400">{products.filter(p => p.category === cat.name).length} items linked</p>
                          </div>
                          <button
                            onClick={() => {
                              if (confirm(`Delete category ${cat.name}?`)) {
                                setCategories(categories.filter(c => c.id !== cat.id));
                                showToast("Category removed.");
                              }
                            }}
                            className="p-2 bg-red-950/40 text-red-400 rounded-xl border border-red-900/50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. MEDIA & BRANDING MANAGER */}
              {adminActiveTab === 'branding' && (
                <div className="space-y-6 animate-fadeIn bg-[#121212] p-8 rounded-3xl border border-zinc-800">
                  <h2 className="text-xl font-bold text-white">Media & Branding Manager</h2>
                  <p className="text-xs text-zinc-400">Update the store hero photo and banner text.</p>

                  <div className="space-y-4 max-w-2xl pt-4">
                    <div className="space-y-3">
                      <label className="block text-xs font-medium text-zinc-400">Hero Section Photo</label>
                      <div className="max-w-sm overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
                        <img
                          src={settings.heroImage || INITIAL_SETTINGS.heroImage}
                          alt="Hero section preview"
                          className="h-52 w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-zinc-900 px-4 py-3 text-xs font-bold text-zinc-200 border border-zinc-700 hover:border-amber-500 transition">
                          <Upload className="w-4 h-4" /> Upload Hero Photo
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleHeroImageUpload}
                            className="hidden"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setSettings((previous) => ({
                              ...previous,
                              heroImage: INITIAL_SETTINGS.heroImage
                            }));
                            showToast("Default hero photo restored.");
                          }}
                          className="rounded-xl border border-zinc-700 px-4 py-3 text-xs font-bold text-zinc-300 hover:border-amber-500 transition"
                        >
                          Restore Default Photo
                        </button>
                      </div>
                      <p className="text-xs text-zinc-500">Choose an image up to 12 MB. It will be resized and uploaded so all visitors can see it.</p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1">Hero Banner Title</label>
                      <input
                        type="text"
                        value={settings.bannerTitle}
                        onChange={(e) => setSettings({ ...settings, bannerTitle: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1">Banner Subtitle / Description</label>
                      <textarea
                        rows="3"
                        value={settings.bannerSubtitle}
                        onChange={(e) => setSettings({ ...settings, bannerSubtitle: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 resize-none"
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. WEBSITE SETTINGS MANAGER & PASSWORD CHANGE */}
              {adminActiveTab === 'settings' && (
                <div className="space-y-8 animate-fadeIn">
                  
                  {/* STORE INFO SETTINGS */}
                  <div className="bg-[#121212] p-8 rounded-3xl border border-zinc-800 space-y-6">
                    <h2 className="text-xl font-bold text-white">Website & Contact Settings</h2>
                    <p className="text-xs text-zinc-400">Updates are saved automatically and published to every visitor.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 max-w-3xl">
                      <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-1">Business Name</label>
                        <input
                          type="text"
                          value={settings.businessName}
                          onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                          className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-1">Proprietor Name</label>
                        <input
                          type="text"
                          value={settings.proprietor}
                          onChange={(e) => setSettings({ ...settings, proprietor: e.target.value })}
                          className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-1">WhatsApp / Phone Number</label>
                        <input
                          type="text"
                          value={settings.phone}
                          onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                          className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-1">Operating Hours</label>
                        <input
                          type="text"
                          value={settings.hours}
                          onChange={(e) => setSettings({ ...settings, hours: e.target.value })}
                          className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-zinc-400 mb-1">Store Address (Satna)</label>
                        <input
                          type="text"
                          value={settings.address}
                          onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                          className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white"
                        />
                      </div>
                    </div>

                  </div>

                  {/* SHARED ADMIN ACCOUNT */}
                  <div className="bg-[#121212] p-8 rounded-3xl border border-amber-500/30 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                        <Lock className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">Shared Admin Account</h2>
                        <p className="text-xs text-zinc-400">Admin accounts are managed securely in Supabase Authentication.</p>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-300">
                      Signed in as <span className="font-semibold text-amber-400">{adminUser?.email}</span>
                    </p>
                  </div>

                </div>
              )}

              {/* 6. SUPABASE SQL SCHEMA TAB */}
              {adminActiveTab === 'sql' && (
                <div className="space-y-4 animate-fadeIn bg-[#121212] p-8 rounded-3xl border border-zinc-800">
                  <h2 className="text-xl font-bold text-white">Shared Website Setup</h2>
                  <p className="text-sm leading-relaxed text-zinc-300">
                    To sync changes across all visitors, run <code className="text-amber-400">supabase/schema.sql</code> in
                    your Supabase SQL Editor. Then create an Auth user, add its user ID
                    to <code className="text-amber-400">public.site_admins</code>, and set
                    the Supabase Project URL and publishable key as Vercel environment
                    variables.
                  </p>
                  <p className="text-xs leading-relaxed text-zinc-400">
                    Full steps are in <code>SUPABASE_SETUP.md</code>. Never add the
                    Supabase service-role/secret key to this frontend.
                  </p>
                </div>
              )}

            </div>
          )}

        </div>
      )}

      {/* ========================================== */}
      {/* PRODUCT DETAILS MODAL */}
      {/* ========================================== */}
      {selectedProductModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-amber-500/30 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-fadeIn relative">
            <button
              onClick={() => setSelectedProductModal(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-72 md:h-full bg-zinc-900">
                <img
                  src={selectedProductModal.images[0]}
                  alt={selectedProductModal.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-bold">
                    {selectedProductModal.category}
                  </span>
                  <h2 className="text-2xl font-bold text-white">{selectedProductModal.name}</h2>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black text-amber-400">₹{selectedProductModal.price}</span>
                    {selectedProductModal.mrp && <span className="text-sm text-zinc-500 line-through">₹{selectedProductModal.mrp}</span>}
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">{selectedProductModal.description}</p>
                </div>

                <div className="space-y-4 pt-4 border-t border-zinc-800">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                    <CheckCircle className="w-4 h-4" /> {selectedProductModal.inStock ? 'In Stock at Satna Store' : 'Out of Stock'}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        addToCart(selectedProductModal);
                        setSelectedProductModal(null);
                      }}
                      disabled={!selectedProductModal.inStock}
                      className="w-full py-4 bg-amber-500 text-black rounded-2xl font-extrabold flex items-center justify-center gap-2 hover:bg-amber-400 transition disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ShoppingBag className="w-5 h-5" /> Add to Cart
                    </button>
                    <button
                      onClick={() => {
                        openWhatsApp(selectedProductModal.name);
                        setSelectedProductModal(null);
                      }}
                      className="w-full py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-2xl font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 hover:opacity-95 transition"
                    >
                      <MessageCircle className="w-5 h-5 fill-white" /> Enquire on WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CART */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setCartOpen(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-amber-500/30 bg-[#121212] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-zinc-800 p-5 sm:p-6">
              <div>
                <h2 id="cart-title" className="text-xl font-extrabold text-white sm:text-2xl">Your Cart</h2>
                <p className="mt-1 text-xs text-zinc-400">{cartCount} {cartCount === 1 ? 'item' : 'items'}</p>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="rounded-full bg-zinc-900 p-2.5 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="space-y-3 px-6 py-14 text-center">
                <ShoppingBag className="mx-auto h-12 w-12 text-zinc-600" />
                <h3 className="text-lg font-bold text-white">Your cart is empty</h3>
                <p className="text-sm text-zinc-400">Add products from the catalogue to place a combined WhatsApp order.</p>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    setActiveTab('products');
                  }}
                  className="mt-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-black transition hover:bg-amber-400"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3 overflow-y-auto p-4 sm:p-6">
                  {cartItems.map(({ product, quantity }) => (
                    <div key={product.id} className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-3 sm:gap-4 sm:p-4">
                      <img
                        src={product.images?.[0] || 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=800&auto=format&fit=crop&q=80'}
                        alt=""
                        className="h-16 w-16 shrink-0 rounded-xl object-cover sm:h-20 sm:w-20"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 text-sm font-bold text-white">{product.name}</h3>
                        <p className="mt-1 text-xs text-zinc-400">
                          {priceModeNumerical ? `₹${product.price} each` : 'Price on request'}
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <button
                            onClick={() => changeCartQuantity(product.id, -1)}
                            className="rounded-lg border border-zinc-700 p-1.5 text-zinc-300 transition hover:border-amber-500/50 hover:text-amber-400"
                            aria-label={`Decrease ${product.name} quantity`}
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="min-w-6 text-center text-sm font-bold text-white">{quantity}</span>
                          <button
                            onClick={() => changeCartQuantity(product.id, 1)}
                            className="rounded-lg border border-zinc-700 p-1.5 text-zinc-300 transition hover:border-amber-500/50 hover:text-amber-400"
                            aria-label={`Increase ${product.name} quantity`}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-3">
                        {priceModeNumerical && (
                          <span className="text-sm font-extrabold text-amber-400">₹{Number(product.price || 0) * quantity}</span>
                        )}
                        <button
                          onClick={() => setCart((currentCart) => currentCart.filter((item) => item.productId !== product.id))}
                          className="rounded-lg p-1.5 text-zinc-500 transition hover:bg-red-500/10 hover:text-red-400"
                          aria-label={`Remove ${product.name} from cart`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 border-t border-zinc-800 p-4 sm:p-6">
                  {priceModeNumerical ? (
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-zinc-400">Estimated total</span>
                      <span className="text-xl font-black text-amber-400">₹{cartTotal}</span>
                    </div>
                  ) : (
                    <p className="text-xs text-zinc-400">Prices will be confirmed by the store on WhatsApp.</p>
                  )}
                  <div className="flex flex-col-reverse gap-3 sm:flex-row">
                    <button
                      onClick={() => setCart([])}
                      className="rounded-xl border border-zinc-700 px-4 py-3 text-sm font-bold text-zinc-300 transition hover:border-red-500/50 hover:text-red-400"
                    >
                      Clear Cart
                    </button>
                    <button
                      onClick={orderCartOnWhatsApp}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-extrabold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500"
                    >
                      <MessageCircle className="h-5 w-5 fill-white" /> Order on WhatsApp
                    </button>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      )}

      {/* ========================================== */}
      {/* FLOATING WHATSAPP WIDGET */}
      {/* ========================================== */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => openWhatsApp()}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500 text-black shadow-2xl shadow-emerald-500/50 flex items-center justify-center hover:scale-110 transition-all duration-300 group"
          title="Chat with Tripathi Brothers on WhatsApp"
        >
          <MessageCircle className="w-8 h-8 fill-black text-emerald-500" />
          <span className="absolute right-full mr-3 bg-zinc-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-xl border border-zinc-800 opacity-0 group-hover:opacity-100 transition pointer-events-none">
            Chat with Harshit Tripathi 💬
          </span>
        </button>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#0A0A0A] border-t border-zinc-800 pt-16 pb-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
          
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center font-black text-black">
                TB
              </div>
              <h3 className="font-bold text-xl text-white">{settings.businessName}</h3>
            </div>
            <p className="text-zinc-400 text-sm max-w-md">
              {settings.tagline}. Wholesalers & Retailers of premium mops, wipers, floor cleaners, and housekeeping supplies in Satna, MP.
            </p>
            <p className="text-xs text-zinc-500">
              Proprietor: <span className="text-zinc-300 font-semibold">{settings.proprietor}</span> | Contact: <span className="text-zinc-300 font-semibold">+91 {settings.phone}</span>
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><button onClick={() => setActiveTab('home')} className="hover:text-amber-400 transition">Home</button></li>
              <li><button onClick={() => setActiveTab('products')} className="hover:text-amber-400 transition">Products Catalogue</button></li>
              <li><button onClick={() => setActiveTab('categories')} className="hover:text-amber-400 transition">Categories Showcase</button></li>
              <li><button onClick={() => setActiveTab('contact')} className="hover:text-amber-400 transition">Contact & Satna Map</button></li>
              <li><button onClick={() => setActiveTab('admin')} className="hover:text-amber-400 transition">Admin ERP Portal</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Store Location</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {settings.address}
            </p>
            <p className="text-xs text-amber-400 font-semibold pt-2">
              {settings.hours}
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 border-t border-zinc-900 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} Tripathi Brothers. All rights reserved.</p>
          <p>Designed with Royal Bites aesthetic for Satna Wholesale & Retail Housekeeping Supplies.</p>
        </div>
      </footer>

    </div>
  );
}