import { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaEdit, FaTrash } from 'react-icons/fa';

import axios from '../../../../utils/axios';
import { headerConfig } from '../../../../utils/headerConfig';
import { formatCurrency } from '../../../../utils/formatCurrency';

type PackageItemProps = {
  id: number;
  packageName: string;
  packagePrice: string;
};

const PackageItemAdmin: FC<PackageItemProps> = ({
  id,
  packageName,
  packagePrice,
}) => {
  // Define Router
  const router = useRouter();

  // Handle DELETE Data
  const handleDelete = async (e: any) => {
    e.preventDefault();

    alert('Apakah anda yakin ingin menghapus data ini?');

    await axios
      .delete(`/paket/${id}`, headerConfig())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    router.reload();
  };

  return (
    <div className="container bg-slate-100 dark:bg-white rounded-lg p-5 mb-5">
      <div className="flex items-center justify-between">
        <section>
          <div className="text-left">
            <h1 className="font-bold text-sm text-slate-500">Nama Paket</h1>
            <h1 className="font-bold text-lg text-black capitalize">
              {packageName || 'Tidak diketahui'}
            </h1>
          </div>
          <div className="block md:hidden text-left pt-5">
            <h1 className="font-bold text-sm text-slate-500">Harga</h1>
            <h1 className="font-bold text-lg text-black capitalize">
              {formatCurrency(packagePrice) || 'Tidak diketahui'}
            </h1>
          </div>
        </section>

        <section>
          <div className="hidden md:block text-left">
            <h1 className="font-bold text-sm text-slate-500">Harga</h1>
            <h1 className="font-bold text-lg text-black capitalize">
              {formatCurrency(packagePrice) || 'Tidak diketahui'}
            </h1>
          </div>
        </section>

        <section>
          <Link
            href={`/admin/package/edit/${id}`}
            className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
          >
            <FaEdit className="mr-2" /> Ubah
          </Link>
          <button
            type="button"
            className="flex items-center justify-center bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer mt-2"
            onClick={(e) => handleDelete(e)}
          >
            <FaTrash className="mr-2" /> Hapus
          </button>
        </section>
      </div>
    </div>
  );
};

export default PackageItemAdmin;
