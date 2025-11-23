import { Link } from "react-router";
import { useEffect, useState } from "react";
import ScoreCircle from "./ScoreCircle";

const ResumeCard = ({ resume }: { resume: Resume }) => {
    const { id, companyName, jobTitle, imagePath, feedback } = resume;
    const [resumeUrl, setResumeUrl] = useState('');
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        if (imagePath) {
            setResumeUrl(imagePath);
            setImageError(false);
        }
    }, [imagePath]);

    return (
        <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000">
            <div className="resume-card-header">
                <div className="flex flex-col gap-2">
                    {companyName && <h2 className="!text-black font-bold break-words">{companyName}</h2>}
                    {jobTitle && <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>}
                    {!companyName && !jobTitle && <h2 className="!text-black font-bold">Resume</h2>}
                </div>

                {/* Score Circle */}
                {feedback?.overallScore !== undefined && (
                    <ScoreCircle score={feedback.overallScore} />
                )}
            </div>

            {resumeUrl && (
                <div className="gradient-border animate-in fade-in duration-1000">
                    <div className="w-full h-full">
                        <img
                            src={resumeUrl}
                            alt="resume"
                            className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
                            onError={() => {
                                console.error('Failed to load image:', resumeUrl);
                                setImageError(true);
                            }}
                        />
                        {imageError && (
                            <div className="flex items-center justify-center h-[350px] bg-gray-100 text-gray-500">
                                Image not found
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Link>
    );
};

export default ResumeCard;