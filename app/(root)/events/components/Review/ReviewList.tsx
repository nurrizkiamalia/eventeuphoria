import useReview from "@/hooks/useReview"
import ReviewBox from "./ReviewBox";

const ReviewList: React.FC = () => {
    const {reviews, loading, error} = useReview();

    if (loading) return <p>Loading Reviews...</p>;
    if (error) return <p>Error loading Reviews: {error}</p>;

    return(
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((review) => {
                return(
                   <ReviewBox review={review} key={review.id} />
                )
            })}
        </div>
        </>
    )
}

export default ReviewList