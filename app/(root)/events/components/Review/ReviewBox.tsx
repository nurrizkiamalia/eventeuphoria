import { ReviewProps } from "@/types/datatypes";
import Image from "next/image";
import userImg from "@/public/assets/user.png";
import { FaStar } from "react-icons/fa";

interface reviewBox {
  review: ReviewProps;
}

const ReviewBox: React.FC<reviewBox> = ({ review }) => {
  return (
    <>
      <div className="review shadow-boxed p-5 rounded-xl flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Image
            src={userImg}
            alt="user"
            width={50}
            height={50}
            className="rounded-full border-4 border-black"
          />
          <p>username</p>
        </div>
        <hr />
        <div className="flex flex-col gap-2">
          <p>{review.review} </p>
          <p className="flex items-center gap-3">
            <FaStar /> {review.rating}{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default ReviewBox;
