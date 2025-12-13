import { ChevronDown } from "lucide-react";

export default function ProductDescription({ description }) {
  // const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);

  return (
    <div className="mt-6 border border-gray-200 rounded">
      <button
        // onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
        className="w-full flex items-center justify-between p-4 font-semibold text-left hover:bg-gray-50"
      >
        Description
        <ChevronDown
          // className={`transition-transform ${
          //   isDescriptionOpen ? "rotate-180" : ""
          // }`}
          size={20}
        />
      </button>
      {/* {isDescriptionOpen && ( */}
      <div className="px-4 pb-4 text-gray-700 text-sm border-t border-gray-200 pt-4 overflow-hidden">
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  );
}
