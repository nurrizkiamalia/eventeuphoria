import ReviewInput from "./ReviewInput"
import ReviewList from "./ReviewList"

const Review: React.FC = () => {
    return(
        <>
        <div className="flex flex-col gap-5 items-center justify-center">
            <ReviewInput />
            <hr />
            <ReviewList />
        </div>
        </>
    )
}

export default Review