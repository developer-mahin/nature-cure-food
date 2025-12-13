"use client";

import { Phone } from "@mui/icons-material";
import CheckoutCard from "../ui/CheckoutCard";
import IconTextField from "../ui/IconTextField";

const PhoneNumberForm = ({ formData, onInputChange }) => {
  return (
    <div className="lg:mt-0 mt-6"> 
      <CheckoutCard title="Phone Number">
        <IconTextField
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={onInputChange}
          placeholder="Phone Number"
          type="tel"
          icon={Phone}
        />
      </CheckoutCard>
    </div>
  );
};

export default PhoneNumberForm;
