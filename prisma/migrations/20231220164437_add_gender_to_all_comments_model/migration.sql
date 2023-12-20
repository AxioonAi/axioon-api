-- AlterEnum
ALTER TYPE "SexType" ADD VALUE 'UNKNOWN';

-- AlterTable
ALTER TABLE "FacebookPostComments" ADD COLUMN     "authorGender" "SexType" NOT NULL DEFAULT 'MALE';

-- AlterTable
ALTER TABLE "InstagramMentionComment" ADD COLUMN     "authorGender" "SexType" NOT NULL DEFAULT 'MALE';

-- AlterTable
ALTER TABLE "InstagramPostComment" ADD COLUMN     "authorGender" "SexType" NOT NULL DEFAULT 'MALE';

-- AlterTable
ALTER TABLE "TiktokCommentData" ADD COLUMN     "authorGender" "SexType" NOT NULL DEFAULT 'MALE';

-- AlterTable
ALTER TABLE "YoutubeCommentData" ADD COLUMN     "authorGender" "SexType" NOT NULL DEFAULT 'MALE';
