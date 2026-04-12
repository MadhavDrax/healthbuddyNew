import React, { useState, useEffect } from 'react';
import { getReviews } from '../../services/api';
import UserAvatar from '../../components/common/UserAvatar';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews();
        setReviews(data);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const calculateAverageRating = () => {
    const ratedReviews = reviews.filter(r => r.rating);
    if (ratedReviews.length === 0) return 0;
    const sum = ratedReviews.reduce((acc, curr) => acc + curr.rating, 0);
    return (sum / ratedReviews.length).toFixed(1);
  };

  const getTagStyle = (type) => {
    switch (type) {
      case 'REVIEW': return 'bg-[#6ee7b7] text-[#006b4d]';
      case 'FEATURE REQUEST': return 'bg-teal-300 text-teal-800';
      case 'SUGGESTION': return 'bg-blue-200 text-blue-800';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <div className="p-8 max-w-[1200px] mx-auto animate-in fade-in duration-500">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1a2e25] mb-2 tracking-tight">
            Reviews & <span className="text-[#00a676]">Suggestions</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm">
            Manage community sentiment and clinical feature requests. Your responses here direct the product roadmap.
          </p>
        </div>
        <button className="bg-[#00a676] hover:bg-[#008f65] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#00a676]/25 transition-all">
          <span className="material-symbols-outlined text-[20px]">insights</span>
          Sentiment Analysis
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-[24px] p-8 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
               <div className="w-8 h-8 rounded-lg bg-[#6ee7b7] flex items-center justify-center text-[#065f46]">
                  <span className="material-symbols-outlined text-[16px]">chat_bubble</span>
               </div>
               TOTAL FEEDBACK
            </div>
            <div className="text-5xl font-extrabold text-[#1a2e25] mb-2">{reviews.length}</div>
            <div className="text-xs font-bold text-[#00a676] flex items-center gap-1">
               <span className="material-symbols-outlined text-[16px]">trending_up</span>
               +12% this month
            </div>
        </div>
        <div className="bg-white rounded-[24px] p-8 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
               <div className="w-8 h-8 rounded-lg bg-[#6ee7b7] flex items-center justify-center text-[#065f46]">
                  <span className="material-symbols-outlined text-[16px]">star</span>
               </div>
               AVERAGE RATING
            </div>
            <div className="flex items-end gap-2 mb-2">
               <div className="text-5xl font-extrabold text-[#1a2e25]">{calculateAverageRating()}</div>
               <div className="text-xl font-bold text-slate-400 mb-1">/ 5.0</div>
            </div>
            <div className="flex text-[#00a676] gap-1">
               {[1,2,3,4,5].map(i => (
                  <span key={i} className="material-symbols-outlined text-[20px]">{i <= Math.round(calculateAverageRating()) ? 'star' : 'star_border'}</span>
               ))}
            </div>
        </div>
      </div>

      <div className="bg-white rounded-[32px] p-8 shadow-sm">
         <div className="flex justify-between items-center mb-8">
            <div className="flex gap-4">
               <select className="bg-white border border-slate-200 text-sm font-bold text-slate-600 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-[#00a676]/20">
                  <option>All Feedback Types</option>
               </select>
               <select className="bg-white border border-slate-200 text-sm font-bold text-slate-600 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-[#00a676]/20">
                  <option>All Statuses</option>
               </select>
            </div>
            <div className="text-xs font-bold text-slate-500 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-[#00a676]"></span>
               Displaying {reviews.length} entries
            </div>
         </div>

         {isLoading ? (
            <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00a676]"></div></div>
         ) : reviews.length === 0 ? (
            <div className="text-center p-12 text-slate-400 font-medium">No reviews found.</div>
         ) : (
            <div className="space-y-6">
              {reviews.map((review, i) => (
                <div key={review._id || i} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-3">
                     <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-[14px] shrink-0">
                           <UserAvatar name={review.user?.userName || 'Unknown User'} className="w-full h-full text-lg shadow-sm border border-white" />
                        </div>
                        <div>
                           <h3 className="font-bold text-[#1a2e25] text-base">{review.user?.userName || 'Unknown User'}</h3>
                           <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs text-slate-500 font-medium">
                                 {new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                              </span>
                              {review.type && (
                                <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${getTagStyle(review.type)}`}>
                                   {review.type}
                                </span>
                              )}
                              {review.rating && (
                                <div className="flex text-[#00a676]">
                                   {[1,2,3,4,5].map(star => (
                                      <span key={star} className="material-symbols-outlined text-[14px]">
                                         {star <= review.rating ? 'star' : 'star_outline'}
                                      </span>
                                   ))}
                                </div>
                              )}
                           </div>
                        </div>
                     </div>
                     {review.status === 'NEW' && <span className="bg-[#dcfce7] text-[#166534] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1"><span className="w-1.5 h-1.5 bg-[#166534] rounded-full"></span>NEW</span>}
                     {review.status === 'RESPONDED' && <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">check</span>RESPONDED</span>}
                     {review.status === 'REVIEWED' && <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1"><span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>REVIEWED</span>}
                  </div>
                  {review.comment && (
                    <p className="pl-16 text-sm text-slate-600 leading-relaxed font-medium">
                       "{review.comment}"
                    </p>
                  )}
                </div>
              ))}
            </div>
         )}
      </div>
    </div>
  );
};

export default AdminReviews;
