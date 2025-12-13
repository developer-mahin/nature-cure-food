# Checkout Components

This directory contains all reusable Material UI components for the checkout functionality, organized in a clean, modular structure.

## 📁 Directory Structure

```
src/components/checkout/
├── forms/                    # Form components
│   ├── PhoneNumberForm.jsx   # Phone number input form
│   ├── DeliveryForm.jsx      # Delivery information form
│   └── PaymentForm.jsx       # Payment information form
├── layout/                   # Layout components
│   ├── CheckoutLayout.jsx    # Main checkout layout wrapper
│   └── CheckoutHeader.jsx    # Checkout page header
├── order-summary/            # Order summary components
│   ├── OrderSummary.jsx      # Complete order summary
│   └── OrderItem.jsx         # Individual order item
├── ui/                       # Reusable UI components
│   ├── IconTextField.jsx     # Text field with icon
│   ├── RadioGroupField.jsx   # Radio button group
│   ├── CheckoutButton.jsx    # Styled button component
│   ├── QuantityControl.jsx   # Quantity increment/decrement
│   ├── RemoveItemButton.jsx  # Remove item button
│   └── CheckoutCard.jsx      # Card wrapper component
├── index.js                  # Export all components
└── README.md                 # This file
```

## 🎯 Components Overview

### Layout Components

#### `CheckoutLayout`

- **Purpose**: Main layout wrapper for checkout page
- **Features**: Responsive grid layout, sticky order summary
- **Props**: `children`, `orderSummary`

#### `CheckoutHeader`

- **Purpose**: Page header with title and breadcrumbs
- **Features**: Green accent line, responsive typography

### Form Components

#### `PhoneNumberForm`

- **Purpose**: Phone number input section
- **Features**: Material UI TextField with phone icon
- **Props**: `formData`, `onInputChange`

#### `DeliveryForm`

- **Purpose**: Delivery information form
- **Features**: Name, phone, address fields with icons, shipping method selection
- **Props**: `formData`, `onInputChange`, `onRadioChange`

#### `PaymentForm`

- **Purpose**: Payment information and SSLCOMMERZ integration
- **Features**: Payment flow diagram, billing address options, pay button
- **Props**: `formData`, `onRadioChange`

### Order Summary Components

#### `OrderSummary`

- **Purpose**: Complete order summary sidebar
- **Features**: Order items, coupon code, totals calculation
- **Props**: `items`, `subtotal`, `shippingCost`, `total`, `onUpdateQuantity`, `onRemoveItem`

#### `OrderItem`

- **Purpose**: Individual order item display
- **Features**: Product image, name, price, quantity controls, remove button
- **Props**: `item`, `onUpdateQuantity`, `onRemoveItem`

### UI Components

#### `IconTextField`

- **Purpose**: Text input with icon
- **Features**: Custom styling, icon positioning, focus states
- **Props**: `label`, `value`, `onChange`, `placeholder`, `type`, `name`, `required`, `icon`

#### `RadioGroupField`

- **Purpose**: Radio button group with options
- **Features**: Custom styling, price display, flexible options
- **Props**: `label`, `name`, `value`, `onChange`, `options`

#### `CheckoutButton`

- **Purpose**: Styled button component
- **Features**: Multiple variants, consistent styling, icons support
- **Props**: `variant`, `fullWidth`, `size`, `onClick`, `disabled`, `startIcon`, `endIcon`

#### `QuantityControl`

- **Purpose**: Quantity increment/decrement controls
- **Features**: Min/max validation, Material UI icons
- **Props**: `quantity`, `onIncrease`, `onDecrease`, `min`

#### `RemoveItemButton`

- **Purpose**: Remove item button with confirmation
- **Features**: Tooltip, hover effects, Material UI styling
- **Props**: `onRemove`, `tooltip`

#### `CheckoutCard`

- **Purpose**: Card wrapper for sections
- **Features**: Consistent styling, shadow effects, responsive padding
- **Props**: `title`, `children`

## 🚀 Usage Example

```jsx
import {
  CheckoutLayout,
  PhoneNumberForm,
  DeliveryForm,
  PaymentForm,
  OrderSummary,
} from "@/components/checkout";

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    phoneNumber: "",
    address: "",
    shippingMethod: "inside-dhaka",
    billingAddress: "same",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const orderSummary = (
    <OrderSummary
      items={items}
      subtotal={subtotal}
      shippingCost={shippingCost}
      total={total}
      onUpdateQuantity={updateQuantity}
      onRemoveItem={removeItem}
    />
  );

  return (
    <CheckoutLayout orderSummary={orderSummary}>
      <PhoneNumberForm formData={formData} onInputChange={handleInputChange} />
      <DeliveryForm
        formData={formData}
        onInputChange={handleInputChange}
        onRadioChange={handleRadioChange}
      />
      <PaymentForm formData={formData} onRadioChange={handleRadioChange} />
    </CheckoutLayout>
  );
}
```

## 🎨 Material UI Integration

All components are built using Material UI components and follow Material Design principles:

- **Typography**: Consistent font weights and sizes
- **Colors**: Primary green theme with proper contrast
- **Spacing**: Consistent spacing using Material UI spacing system
- **Responsive**: Mobile-first responsive design
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Icons**: Material UI icons for consistency

## 📱 Features

- ✅ **Fully Responsive**: Works on all screen sizes
- ✅ **Material UI**: 100% Material UI components
- ✅ **Reusable**: Modular, composable components
- ✅ **Accessible**: WCAG compliant
- ✅ **Type Safe**: PropTypes for all components
- ✅ **Customizable**: Styled components with theme support
- ✅ **Performance**: Optimized rendering and state management

## 🔧 Customization

All components use Material UI's `styled` API for easy customization:

```jsx
const CustomButton = styled(CheckoutButton)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
  },
}));
```

## 🧪 Testing

Visit: `http://localhost:3001/checkout`

The checkout page now uses all Material UI components with a clean, organized structure that's easy to maintain and extend.
