import Image from 'next/image';

export default function ClientLogos() {
  const clients = [
    { name: "Client 1", logo: "/images/client1.png" },
    { name: "Client 2", logo: "/images/client2.png" },
    { name: "Client 3", logo: "/images/client3.png" },
    { name: "Client 4", logo: "/images/client4.png" },
    { name: "Client x", logo: "/images/client5.png" },
    { name: "Client 6", logo: "/images/client5.png" },
    { name: "Client 7", logo: "/images/client4.png" },
    { name: "Client 8", logo: "/images/client1.png" },
    { name: "Client 9", logo: "/images/client2.png" },
    { name: "Indonesian Government", logo: "/images/client1.png" },
  ];

  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-8">
      {clients.map((client, index) => (
        <div key={index} className="flex items-center justify-center">
          <div className="relative w-16 h-16 md:w-20 md:h-20">
            <Image 
              src={client.logo} 
              alt={client.name}
              fill
              className="object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
}