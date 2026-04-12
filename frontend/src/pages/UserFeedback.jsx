import React, { useState } from 'react';
import { submitReview } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserFeedback = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [type, setType] = useState('REVIEW');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to submit feedback.');
      return;
    }
    
    // As per instruction, rating is required. Type can default to suggesting or reviewing.
    if (rating === 0) {
      setError('Please provide a star rating.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await submitReview({ rating, type, comment });
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 animate-in fade-in zoom-in-95 duration-500">
         <div className="w-20 h-20 bg-[#dcfce7] text-[#166534] rounded-full flex items-center justify-center mb-6 shadow-sm border border-[#bbf7d0]">
            <span className="material-symbols-outlined text-[40px]">task_alt</span>
         </div>
         <h2 className="text-3xl font-extrabold text-[#1a2e25] mb-4">Thank You!</h2>
         <p className="text-slate-600 max-w-md font-medium leading-relaxed">
           Your feedback has been securely transmitted. Helping to shape the future of clinical sanctuary.
         </p>
         <p className="text-xs font-bold text-slate-400 mt-8 uppercase tracking-widest animate-pulse">Redirecting to Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[700px] mx-auto p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-10">
           <h1 className="text-4xl font-extrabold text-[#1a2e25] tracking-tight mb-4">Share Your Experience</h1>
           <p className="text-slate-500 font-medium max-w-lg mx-auto">
             Whether it's a glowing review or a vital feature request, your clinical insights drive HealthBuddy's evolution.
           </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50">
           
           {error && (
             <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-medium border border-red-100 flex items-start gap-3 mb-6">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <p>{error}</p>
             </div>
           )}

           <div className="mb-8">
              <label className="block text-xs font-bold text-[#1a2e25] uppercase tracking-widest mb-4">Overall Rating</label>
              <div className="flex gap-2">
                 {[1, 2, 3, 4, 5].map((star) => (
                    <button
                       key={star}
                       type="button"
                       onMouseEnter={() => setHoverRating(star)}
                       onMouseLeave={() => setHoverRating(0)}
                       onClick={() => setRating(star)}
                       className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                    >
                       <span className={`material-symbols-outlined text-[40px] transition-colors ${star <= (hoverRating || rating) ? 'text-[#00a676]' : 'text-slate-200'}`}>
                          {star <= (hoverRating || rating) ? 'star' : 'star_border'}
                       </span>
                    </button>
                 ))}
              </div>
           </div>

           <div className="mb-8">
              <label className="block text-xs font-bold text-[#1a2e25] uppercase tracking-widest mb-4">Review Comments <span className="text-slate-400 font-medium normal-case tracking-normal">(Optional)</span></label>
              <textarea 
                 value={comment}
                 onChange={(e) => setComment(e.target.value)}
                 rows="4" 
                 placeholder="Tell us what you loved or what we can improve..."
                 className="w-full bg-[#f8fbfa] border border-slate-100 text-[#1a2e25] text-sm font-medium p-5 rounded-[20px] focus:ring-2 focus:ring-[#00a676]/20 outline-none transition-all placeholder:text-slate-400 resize-none shadow-inner"
              ></textarea>
           </div>

           <button 
             type="submit" 
             disabled={isSubmitting}
             className="w-full py-4.5 bg-[#1a2e25] hover:bg-[#0f1d17] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
           >
              {isSubmitting ? 'Transmitting...' : 'Submit Feedback'}
              {!isSubmitting && <span className="material-symbols-outlined text-[18px]">send</span>}
           </button>
        </form>
    </div>
  );
};

export default UserFeedback;
