import { FC } from 'react';
import Link from 'next/link';
import { FaInfoCircle } from 'react-icons/fa';

type PaymentItemProps = {
  id: number;
  studentName: string;
  nisn: string;
  totalPayment: string;
  datePayment: string;
};

const PaymentItemAdmin: FC<PaymentItemProps> = ({
  id,
  studentName,
  nisn,
  totalPayment,
  datePayment,
}) => {
  // Format currency to IDR
  const formatCurrency = (num: string) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(Number(num));
  };

  // Format Date Time
  const formatTime = (time: any) => {
    const date = new Date(time);
    return `${date.getDate()}/${
      Number(date.getMonth()) + 1
    }/${date.getFullYear()}`;
  };

  return (
    <div className="container bg-slate-100 dark:bg-white rounded-lg p-5 mb-5">
      <div className="flex items-center justify-between">
        <section>
          <div className="text-left">
            <h1 className="font-bold text-sm text-slate-500">Nama Siswa</h1>
            <h1 className="font-bold text-lg text-black">
              {studentName || 'Tidak diketahui'}
            </h1>
          </div>
          <div className="text-left pt-5">
            <h1 className="font-bold text-sm text-slate-500">NISN</h1>
            <h1 className="font-bold text-lg text-black">
              {nisn || 'Tidak diketahui'}
            </h1>
          </div>
          <div className="block md:hidden text-left pt-5">
            <h1 className="font-bold text-sm text-slate-500">Jumlah Bayar</h1>
            <h1 className="font-bold text-lg text-black">
              {formatCurrency(totalPayment) || 'Tidak diketahui'}
            </h1>
          </div>
          <div className="block md:hidden text-left pt-5">
            <h1 className="font-bold text-sm text-slate-500">Tanggal Bayar</h1>
            <h1 className="font-bold text-lg text-black">
              {formatTime(datePayment) || 'Tidak diketahui'}
            </h1>
          </div>
        </section>

        <section className="hidden md:block">
          <div className="text-left">
            <h1 className="font-bold text-sm text-slate-500">Jumlah Bayar</h1>
            <h1 className="font-bold text-lg text-black">
              {formatCurrency(totalPayment) || 'Tidak diketahui'}
            </h1>
          </div>
          <div className="text-left pt-5">
            <h1 className="font-bold text-sm text-slate-500">Tanggal Bayar</h1>
            {/* use formatTime */}
            <h1 className="font-bold text-lg text-black">
              {formatTime(datePayment) || 'Tidak diketahui'}
            </h1>
          </div>
        </section>

        <section>
          <Link
            href={`/admin/payment/detail/${id}`}
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
          >
            <FaInfoCircle className="mr-2" /> Detail
          </Link>
        </section>
      </div>
    </div>
  );
};

export default PaymentItemAdmin;
