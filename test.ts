import axios from 'axios';

const test = async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/getChallenges', {
      headers: {
        'x-init-data': process.env.MOCK_INIT_DATA,
      },
    });

    console.log('data', data);
  } catch (e) {
    console.error(e.message);
  }

  // console.log('challenges', data);
};

test();
