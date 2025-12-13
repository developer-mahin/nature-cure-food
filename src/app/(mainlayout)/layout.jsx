import { ChatProvider } from "@/components/chat/ChatProvider";
import Footer from "@/components/main/shared/Footer/FooterWrapper";
import Header from "@/components/main/shared/Header/Header";

export default function MainLayout({ children }) {
  return (
    <>
      {/* <ChatProvider> */}
      <Header />
      <main>{children}</main>
      <Footer />
      {/* </ChatProvider> */}
    </>
  );
}
