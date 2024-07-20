export default function SectionHeaders({ subHeader, mainHeader }) {
    return (
      <>
        <h1 className="uppercase text-gray-500 font-semibold leading-3">
          {subHeader}
        </h1>
        <h2 className="text-primary font-bold text-4xl italic">{mainHeader}</h2>
      </>
    );
  }
  