import SkeletonLoader from "@/common/components/elements/SkeletonLoader";

const ChatItemSkeleton = () => {
  return (
    <SkeletonLoader>
      <div className="space-y-5 py-4">
        {/* Skeleton 1 */}
        <div className="flex items-center gap-3 px-4 lg:px-8">
          <div className="h-[40px] w-[40px] bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          <div className="space-y-1 flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-x-2 gap-y-1">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
            </div>
            <div className="group flex flex-col w-fit relative">
              <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-xl w-64"></div>
            </div>
          </div>
        </div>
        {/* Skeleton 2 */}
        <div className="flex items-center gap-3 px-4 lg:px-8 flex-row-reverse">
          <div className="h-[40px] w-[40px] bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          <div className="space-y-1 flex-1 flex flex-col items-end">
            <div className="flex flex-col md:flex-row md:items-center gap-x-2 gap-y-1 md:flex-row-reverse">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
            </div>
            <div className="group flex flex-col w-fit relative items-end">
              <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-xl w-48"></div>
            </div>
          </div>
        </div>
        {/* Skeleton 3 */}
        <div className="flex items-center gap-3 px-4 lg:px-8">
          <div className="h-[40px] w-[40px] bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          <div className="space-y-1 flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-x-2 gap-y-1">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
            </div>
            <div className="group flex flex-col w-fit relative">
              <div className="h-14 bg-gray-300 dark:bg-gray-700 rounded-xl w-56"></div>
            </div>
          </div>
        </div>
      </div>
    </SkeletonLoader>
  );
};

export default ChatItemSkeleton;
