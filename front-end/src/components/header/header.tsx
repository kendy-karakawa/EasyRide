import Link from 'next/link'

export default function Header() {
  return (
    <div className="bg-gray-800 fixed top-0 left-0 w-full z-10 ">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <Link href={"/"}>
            <h1 className="text-gray-50 text-3xl">EasyRide</h1>
          </Link>
          <div className='flex flex-row'>
            <Link href={"/"}>
              <h1 className="text-gray-50 mr-8">Home</h1>
            </Link >
            <Link href={"/history/0"}>
              <h1 className="text-gray-50">Minhas viagens</h1>
            </Link >
          </div>
        </div>
      </div>
    </div>
  );
}