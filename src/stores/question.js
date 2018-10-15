import { observable, action } from 'mobx';

class QuestionStore {
  @observable dailyAnswers = [
    {
      user: '1',
      baby: 'kicking'
    },
    {
      user: '2',
      baby: 'kicking'
    },
    {
      user: '3',
      baby: 'kicking'
    }
  ];

  @action
  getUserAnswers = () => {
    return this.dailyAnswers.map(answer => answer.user);
  }
}

export default new QuestionStore();
