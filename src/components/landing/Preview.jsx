import CarouselPreview from "./CarouselPreview";
import EditableComponent from "./EditableComponent";

const Preview = ({ sections = [] }) => {
  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <section
          key={section._id}
          className="bg-cover bg-center space-y-7"
          style={{
            padding: section.styles?.padding,
            margin: section.styles?.margin,
            borderRadius: section.styles?.borderRadius,
            backgroundColor: section.styles?.backgroundColor,
            backgroundImage: section.styles?.backgroundImage
              ? `url(${section.styles.backgroundImage})`
              : "",
          }}
        >
          {section.fields.map((field) => (
            <div
              key={field._id}
              style={{
                margin: field.styles?.margin,
                width: field.styles?.width,
                maxWidth: field.styles?.maxWidth,
                backgroundColor:
                  field.type === "button" || field.styles?.backgroundColor,
                backgroundImage: field.styles?.backgroundImage
                  ? `url(${field.styles.backgroundImage})`
                  : "",
                padding: field.styles?.padding,
                borderRadius: field.styles?.borderRadius,
              }}
            >
              {field.type === "text" ? (
                <>
                  {/* paragraph */}
                  {parseFloat(field.styles.fontSize || 0) <= 18 && (
                    <EditableComponent
                      disabled={true}
                      tagName="p"
                      content={field.value}
                      style={field.styles}
                    />
                  )}

                  {/* heading */}
                  {parseFloat(field.styles.fontSize) > 18 && (
                    <EditableComponent
                      disabled={true}
                      tagName="h1"
                      content={field.value}
                      style={field.styles}
                    />
                  )}
                </>
              ) : field.type === "image" ? (
                <div style={field.styles}>
                  <img
                    alt="image"
                    src={field.value}
                    style={{ borderRadius: field.styles.borderRadius }}
                  />
                </div>
              ) : field.type === "table" ? (
                <div className="overflow-x-auto">
                  <table
                    className="border-collapse min-w-full divide-y divide-gray-200"
                    style={{
                      border: field.styles.border,
                      borderRadius: field.styles.borderRadius,
                      width: field.styles.width,
                    }}
                  >
                    <thead className="whitespace-nowrap">
                      <tr
                        style={{
                          backgroundColor: field.styles.headerBackground,
                        }}
                      >
                        {field.value.headers.map((header, colIndex) => (
                          <th
                            className="px-4 py-4 text-left text-slate-900 tracking-wider"
                            key={colIndex}
                            style={{
                              padding: field.styles.cellPadding,
                              color: field.styles.headerTextColor,
                            }}
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 whitespace-nowrap">
                      {field.value.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, colIndex) => (
                            <td
                              className="px-4 py-4 text-slate-900 font-medium"
                              key={colIndex}
                              style={{
                                padding: field.styles.cellPadding,
                                border: field.styles.border,
                              }}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : field.type === "button" ? (
                <button
                  style={field.styles}
                  className="hover:opacity-90 transition-opacity"
                >
                  {field.value.text}
                </button>
              ) : field.type === "ordered-list" ? (
                <ul
                  className="space-y-3"
                  style={{
                    color: field.styles?.color,
                    fontSize: field.styles?.fontSize,
                    lineHeight: field.styles?.lineHeight,
                  }}
                >
                  {field.value.map((item, index) => (
                    <li key={index} className="flex text-base">
                      <span className="mr-2.5 mt-0.5">
                        <svg
                          width={20}
                          height={20}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_980_24852)">
                            <path
                              d="M10 0.5625C4.78125 0.5625 0.5625 4.78125 0.5625 10C0.5625 15.2188 4.78125 19.4688 10 19.4688C15.2188 19.4688 19.4688 15.2188 19.4688 10C19.4688 4.78125 15.2188 0.5625 10 0.5625ZM10 18.0625C5.5625 18.0625 1.96875 14.4375 1.96875 10C1.96875 5.5625 5.5625 1.96875 10 1.96875C14.4375 1.96875 18.0625 5.59375 18.0625 10.0312C18.0625 14.4375 14.4375 18.0625 10 18.0625Z"
                              fill="currentColor"
                            />
                            <path
                              d="M12.6875 7.09375L8.96875 10.7188L7.28125 9.0625C7 8.78125 6.5625 8.8125 6.28125 9.0625C6 9.34375 6.03125 9.78125 6.28125 10.0625L8.28125 12C8.46875 12.1875 8.71875 12.2813 8.96875 12.2813C9.21875 12.2813 9.46875 12.1875 9.65625 12L13.6875 8.125C13.9688 7.84375 13.9688 7.40625 13.6875 7.125C13.4063 6.84375 12.9688 6.84375 12.6875 7.09375Z"
                              fill="currentColor"
                            />
                          </g>

                          <defs>
                            <clipPath id="clip0_980_24852">
                              <rect width={20} height={20} fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : field.type === "unordered-list" ? (
                <ol
                  className="space-y-3"
                  style={{
                    color: field.styles?.color,
                    fontSize: field.styles?.fontSize,
                    lineHeight: field.styles?.lineHeight,
                  }}
                >
                  {field.value.map((item, index) => (
                    <li key={index} className="flex">
                      <span
                        className="mr-2.5 flex h-[26px] w-full max-w-[26px] items-center justify-center rounded-full text-white"
                        style={{
                          background: field.styles?.color || "#0f172b",
                        }}
                      >
                        {index}
                      </span>
                      {item}
                    </li>
                  ))}
                </ol>
              ) : field.type === "link" ? (
                <a
                  href={field.value.url}
                  target={field.value.target}
                  rel="noopener noreferrer"
                  style={{
                    color: field.styles?.color,
                    fontSize: field.styles?.fontSize,
                    fontWeight: field.styles?.fontWeight,
                    textDecoration: field.styles?.textDecoration,
                  }}
                  className="underline"
                >
                  {field.value.text}
                </a>
              ) : field.type === "carousel" ? (
                <CarouselPreview images={field.value} styles={field.styles} />
              ) : null}
            </div>
          ))}
        </section>
      ))}
    </div>
  );
};

export default Preview;
