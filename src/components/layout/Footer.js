import Image from "next/image";

export default function Footer() {
  return (
    <footer className="text-white py-6 ml-64 mt-auto w-[calc(100%_-_16rem)]">
      {/* w-[calc(100%_-_16rem)] to account for the width of the sidebar */}
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center">
          <p className="text-sm">
            &copy; 2024 All Rights Reserved by ARK
          </p>
        </div>
      </div>
    </footer>
  );
}
