import ProductImage from "@/components/common/ProductImage";
import Modal from "@/components/ui/Modal";
import { Box, Button, Divider, Typography } from "@mui/material";
import { CheckCircle } from "lucide-react";

const ThankOutModal = ({
  showThankYouModal,
  setShowThankYouModal,
  orderDetails,
}) => {
  return (
    <Modal
      open={showThankYouModal}
      onClose={() => setShowThankYouModal(false)}
      title=""
      maxWidth="md"
      actions={
        <Button
          onClick={() => setShowThankYouModal(false)}
          variant="contained"
          className="font-hind"
          fullWidth
          sx={{
            backgroundColor: "#097B35",
            "&:hover": {
              backgroundColor: "#00662A",
            },
            py: 1.5,
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          ঠিক আছে
        </Button>
      }
    >
      <Box sx={{ textAlign: "center", py: 2 }} className="font-hind">
        <CheckCircle
          style={{
            width: 64,
            height: 64,
            color: "#097B35",
            margin: "0 auto 16px",
          }}
        />
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#097B35",
            mb: 1,
            fontFamily: "inherit",
          }}
        >
          ধন্যবাদ!
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#6b7280", mb: 3, fontFamily: "inherit" }}
        >
          আপনার অর্ডার সফলভাবে গৃহীত হয়েছে
        </Typography>

        {orderDetails && (
          <>
            <Box
              sx={{
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
                p: 2,
                mb: 3,
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "#6b7280", mb: 0.5, fontFamily: "inherit" }}
              >
                অর্ডার নম্বর
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#097B35",
                  fontFamily: "inherit",
                }}
              >
                #{orderDetails.orderId}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                textAlign: "left",
                fontFamily: "inherit",
              }}
            >
              আপনার অর্ডারকৃত পণ্য
            </Typography>

            <Box sx={{ mb: 3 }}>
              {orderDetails.items.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    gap: 2,
                    mb: 2,
                    p: 2,
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px",
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: "8px",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    <ProductImage
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </Box>
                  <Box sx={{ flex: 1, textAlign: "left" }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        mb: 0.5,
                        fontFamily: "inherit",
                      }}
                    >
                      {item.name}
                      {item.size && (
                        <span style={{ textTransform: "capitalize" }}>
                          {" "}
                          ({item.size} {item.measurement})
                        </span>
                      )}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#6b7280", mb: 1, fontFamily: "inherit" }}
                    >
                      পরিমাণ: {item.quantity} × ৳{item.price.toFixed(2)}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        color: "#097B35",
                        fontFamily: "inherit",
                      }}
                    >
                      ৳{item.total.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography
                variant="body1"
                sx={{ color: "#6b7280", fontFamily: "inherit" }}
              >
                ডেলিভারি চার্জ
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, fontFamily: "inherit" }}
              >
                ৳{orderDetails.deliveryCost.toFixed(2)}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
                pt: 2,
                borderTop: "2px solid #e0e0e0",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, fontFamily: "inherit" }}
              >
                মোট
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#097B35",
                  fontFamily: "inherit",
                }}
              >
                ৳{orderDetails.totalBill.toFixed(2)}
              </Typography>
            </Box>

            <Box
              sx={{
                mt: 3,
                p: 2,
                backgroundColor: "#e8f5e9",
                borderRadius: "8px",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "#2e7d32",
                  fontFamily: "inherit",
                  lineHeight: 1.6,
                }}
              >
                আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব। আপনার অর্ডারটি
                প্রক্রিয়াকরণের জন্য ধন্যবাদ!
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ThankOutModal;

