# Category Pages

This directory contains all the category page components for the e-commerce website, including product listing, filtering, sorting, and pagination functionality.

## 📁 Directory Structure

```
src/components/category/
├── CategoryPage.jsx      # Main category page component
├── CategoryLayout.jsx    # Layout component with filters and grid
├── index.js             # Export file
└── README.md            # This file
```

## 🎯 Components Overview

### `CategoryPage`

- **Purpose**: Main category page component that handles routing and state
- **Features**: URL-based pagination, breadcrumbs, error handling
- **Props**: `categorySlug` (string) - The category identifier

### `CategoryLayout`

- **Purpose**: Layout component with product grid, filters, and pagination
- **Features**:
  - Search functionality
  - Sorting options (price, rating, popularity)
  - Product grid with animations
  - Pagination with page info
  - Responsive design
- **Props**:
  - `categoryData` - Category information
  - `products` - Array of products
  - `currentPage` - Current page number
  - `onPageChange` - Page change handler
  - `itemsPerPage` - Items per page (default: 12)

## 📄 Category Pages Created

### 1. **Combo Offer** (`/combo-offer`)

- **Title**: কম্বো অফার
- **Description**: Special combo offers with multiple products at discounted prices
- **Products**: 5 combo packages
- **Features**: Combo items listed, special pricing

### 2. **Heart Medicine** (`/herbal-medicine`)

- **Title**: হার্টের ঔষধ
- **Description**: Herbal medicines for heart health and cardiovascular support
- **Products**: 6 heart health products
- **Features**: Heart-specific formulations

### 3. **Diabetes** (`/dazabaties`)

- **Title**: ডায়াবেটিস
- **Description**: Diabetes management and blood sugar control medicines
- **Products**: 6 diabetes management products
- **Features**: Blood sugar control focus

### 4. **High Blood Pressure** (`/high-presenter`)

- **Title**: হাই প্রেশার
- **Description**: High blood pressure management and control medicines
- **Products**: 5 blood pressure products
- **Features**: BP control formulations

### 5. **Liver Medicine** (`/livar-medicine`)

- **Title**: লিভারের ঔষধ
- **Description**: Liver health and detoxification medicines
- **Products**: 6 liver health products
- **Features**: Detox and liver support

### 6. **Weight Loss** (`/weight-loss`)

- **Title**: ওজন হ্রাস
- **Description**: Weight loss and metabolism boosting medicines
- **Products**: 6 weight loss products
- **Features**: Fat burning and metabolism

### 7. **Allergy Medicine** (`/elarji-medicine`)

- **Title**: এলার্জি ঔষধ
- **Description**: Allergy relief and immune system support medicines
- **Products**: 6 allergy relief products
- **Features**: Anti-histamine and immune support

### 8. **Private Health** (`/secretary-problems`)

- **Title**: গোপন সমস্যার
- **Description**: Private health and intimate wellness medicines
- **Products**: 5 private health products
- **Features**: Discreet intimate care

### 9. **General Medicines** (`/medicines`)

- **Title**: মেডিসিন
- **Description**: General medicines and health supplements
- **Products**: 8 general health products
- **Features**: Vitamins and supplements

## 🚀 Features

### **Search & Filter**

- ✅ **Real-time Search**: Search by product name or description
- ✅ **Sorting Options**: Featured, Price (Low/High), Rating, Popularity
- ✅ **Category Stats**: Product count and average rating
- ✅ **Responsive Filters**: Mobile-friendly filter interface

### **Pagination**

- ✅ **URL-based Pagination**: Page state in URL
- ✅ **Smooth Navigation**: No page reload on pagination
- ✅ **Page Info**: Shows current range and total items
- ✅ **First/Last Buttons**: Quick navigation to extremes

### **Product Display**

- ✅ **Grid Layout**: Responsive product grid (1-4 columns)
- ✅ **Product Cards**: Complete product information
- ✅ **Animations**: Smooth fade-in animations
- ✅ **Rating Display**: Star ratings and review counts
- ✅ **Price Information**: Original and discounted prices

### **SEO & Performance**

- ✅ **Meta Tags**: Unique titles and descriptions for each category
- ✅ **Breadcrumbs**: Clear navigation hierarchy
- ✅ **Server Components**: SEO-friendly page components
- ✅ **Client-side Interactivity**: Smooth user experience

## 📱 Responsive Design

### **Mobile (< 768px)**

- ✅ **1 Column Grid**: Single product per row
- ✅ **Stacked Filters**: Filters stack vertically
- ✅ **Touch-friendly**: Large touch targets

### **Tablet (768px - 1024px)**

- ✅ **2-3 Column Grid**: 2-3 products per row
- ✅ **Side-by-side Filters**: Filters in single row
- ✅ **Medium Spacing**: Balanced layout

### **Desktop (> 1024px)**

- ✅ **4 Column Grid**: 4 products per row
- ✅ **Full Filter Bar**: All filters in one row
- ✅ **Optimal Spacing**: Maximum use of space

## 🧪 Testing

Visit any category page: `http://localhost:3001/[category-slug]`

### **Test Features**:

1. **Navigation**: Click on category links in navbar
2. **Search**: Type in search box to filter products
3. **Sorting**: Change sort order to see different arrangements
4. **Pagination**: Navigate through pages
5. **Product Cards**: Click on products to view details
6. **Responsive**: Test on different screen sizes

### **Sample URLs**:

- `http://localhost:3001/combo-offer`
- `http://localhost:3001/herbal-medicine`
- `http://localhost:3001/dazabaties`
- `http://localhost:3001/weight-loss`
- `http://localhost:3001/medicines`

## 🔧 Customization

### **Adding New Categories**:

1. Add category data to `src/lib/categoryProducts.js`
2. Create page component in `src/app/(mainlayout)/[category]/page.jsx`
3. Update navigation in `src/components/fakeData/navItem.js`

### **Modifying Products**:

1. Edit product data in `src/lib/categoryProducts.js`
2. Products automatically appear on category pages
3. All filtering and sorting works automatically

### **Styling**:

- Uses Material UI components for consistency
- Custom styling with `styled` API
- Responsive breakpoints for all screen sizes
- Green theme matching site design

## ✅ All Features Working

- ✅ **9 Category Pages**: All navigation items have dedicated pages
- ✅ **Product Data**: 50+ products across all categories
- ✅ **Pagination**: 12 items per page with navigation
- ✅ **Search**: Real-time product search
- ✅ **Sorting**: Multiple sort options
- ✅ **Responsive**: Works on all devices
- ✅ **SEO**: Proper meta tags and structure
- ✅ **Animations**: Smooth page transitions
- ✅ **Breadcrumbs**: Clear navigation
- ✅ **URL State**: Pagination in URL

All category pages are fully functional with comprehensive product listings, pagination, and filtering capabilities! 🚀
