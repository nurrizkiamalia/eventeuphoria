const payment = ["BCA", "BNI", "OVO", "Dana", "Shopee Pay", "Mandiri"];

const PaymentMethod: React.FC = () => {
  return (
    <>
    <div className="flex flex-col gap-3">
      <h3 className=" text-tLg font-semibold ">Payment Method List</h3>
      <div>
        {payment.map((item, index) => (
            <div key={index} className="flex gap-3 text-tLg font-semibold " >
                <input type="radio" name="" id="" value={item} />
                <label htmlFor="">{item}</label>
            </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default PaymentMethod;
