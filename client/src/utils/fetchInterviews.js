import { getUserInterviews, getQuestion } from './apiFunctions';

export const fetchInterviews = async (userId) => {
  const { data: userInterviews } = await getUserInterviews(userId);
  const upcomingInterviews = [];
  const pastInterviews = [];
  for (const interview of userInterviews) {
    for (const user of interview.users) {
      if (user.user === userId) {
        const {
          title: questionTitle,
          description: questionDescription,
          _id: questionId,
        } = user.question ? (await getQuestion(user.question)).data.question : {};

        if (interview.endTime) {
          pastInterviews.push({
            createdAt: interview.createdAt,
            endedTime: interview.endTime,
            questionId,
            interviewId: interview._id,
          });
        } else {
          upcomingInterviews.push({
            createdAt: interview.createdAt,
            interviewId: interview._id,
            questionTitle,
            questionDescription,
          });
        }
      }
    }
  }

  return { upcomingInterviews, pastInterviews };
};
