import { FC } from 'react';
import Link from 'next/link';
import { FaInfoCircle } from 'react-icons/fa';

import { formatLocalTime } from '../../../../utils/formatLocalTime';

type TransactionItemProps = {
  id: number;
  memberName: string;
  outletName: string;
  dateTransaction: string;
  statusTransaction: string;
  statusPayment: string;
};

const TransactionItem: FC<TransactionItemProps> = ({
  id,
  memberName,
  outletName,
  dateTransaction,
  statusTransaction,
  statusPayment,
}) => {
  const badgeColorPayment = (status: string) => {
    if (status === 'lunas') {
      return (
        <p className="bg-green-500 px-2 py-0.5 rounded-xl text-white whitespace-no-wrap">
          Lunas
        </p>
      );
    } else {
      return (
        <p className="bg-red-500 px-2 py-0.5 rounded-xl text-white whitespace-no-wrap">
          Belum Lunas
        </p>
      );
    }
  };

  const badgeColorTransaction = (status: string) => {
    if (status === 'baru') {
      return (
        <p className="bg-red-500 px-2 py-0.5 rounded-xl text-white whitespace-no-wrap">
          Baru
        </p>
      );
    } else if (status === 'proses') {
      return (
        <p className="bg-yellow-500 px-2 py-0.5 rounded-xl text-black whitespace-no-wrap">
          Proses
        </p>
      );
    } else if (status === 'selesai') {
      return (
        <p className="bg-green-500 px-2 py-0.5 rounded-xl text-white whitespace-no-wrap">
          Selesai
        </p>
      );
    } else if (status === 'diambil') {
      return (
        <p className="bg-blue-500 px-2 py-0.5 rounded-xl text-white whitespace-no-wrap">
          Diambil
        </p>
      );
    } else {
      return (
        <p className="bg-red-500 px-2 py-0.5 rounded-xl text-white whitespace-no-wrap">
          Dibatalkan
        </p>
      );
    }
  };

  return (
    <div className="container bg-slate-100 dark:bg-white rounded-lg p-5 mb-5">
      <div className="flex justify-between">
        <section>
          <div className="text-left">
            <h1 className="font-bold text-sm text-slate-500">Nama Member</h1>
            <h1 className="font-bold text-lg text-black">
              {memberName || 'Tidak diketahui'}
            </h1>
          </div>
          <div className="text-left pt-5">
            <h1 className="font-bold text-sm text-slate-500">Cabang Outlet</h1>
            <h1 className="font-bold text-lg text-black">
              {outletName || 'Tidak diketahui'}
            </h1>
          </div>
          <div className="text-left pt-5">
            <h1 className="font-bold text-sm text-slate-500">
              Tanggal Transaksi
            </h1>
            <h1 className="font-bold text-lg text-black">
              {formatLocalTime(dateTransaction) || 'Tidak diketahui'}
            </h1>
          </div>
          <div className="block md:hidden text-left pt-5">
            <h1 className="font-bold text-sm text-slate-500">
              Status Transaksi
            </h1>
            <h1 className="font-bold text-lg text-black text-center">
              {badgeColorPayment(statusPayment) || 'Tidak diketahui'}
            </h1>
          </div>
          <div className="block md:hidden text-left pt-5">
            <h1 className="font-bold text-sm text-slate-500">
              Status Pengerjaan
            </h1>
            <h1 className="font-bold text-lg text-black text-center">
              {badgeColorTransaction(statusTransaction) || 'Tidak diketahui'}
            </h1>
          </div>
        </section>

        <section className="hidden md:block">
          <div className="text-left">
            <h1 className="font-bold text-sm text-slate-500">
              Status Transaksi
            </h1>
            <h1 className="font-bold text-lg text-black text-center">
              {badgeColorPayment(statusPayment) || 'Tidak diketahui'}
            </h1>
          </div>
          <div className="text-left pt-5">
            <h1 className="font-bold text-sm text-slate-500">
              Status Pengerjaan
            </h1>
            <h1 className="font-bold text-lg text-black text-center">
              {badgeColorTransaction(statusTransaction) || 'Tidak diketahui'}
            </h1>
          </div>
        </section>

        <section>
          <Link
            href={`/owner/transaction/detail/${id}`}
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
          >
            <FaInfoCircle className="mr-2" /> Detail
          </Link>
        </section>
      </div>
    </div>
  );
};

export default TransactionItem;
