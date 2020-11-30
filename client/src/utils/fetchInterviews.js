import { getUserInterviews, getQuestion } from './apiFunctions'

export const fetchInterviews = async (userId, userState) => {
  const { data: userInterviews } = await getUserInterviews(userId);
  const interviews = [];
  for (const interview of userInterviews) {
    for (const user of interview.users) {
      if (user.user === userId) {
        const {
          _id: userId,
          firstName,
          lastName
        } = userState;

        const {
          title: questionTitle,
          description: questionDescription
        } = user.question ? (await getQuestion(user.question)).data : {};

        interviews.push({
          createdAt: interview.createdAt,
          interviewId: interview._id,
          userId,
          firstName,
          lastName,
          questionTitle,
          questionDescription,
        });
      }
    }
  }

  return interviews;
};
