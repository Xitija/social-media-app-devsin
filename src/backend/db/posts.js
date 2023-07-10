import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content: "Happy 10th birthday to @reactjs! 🎂⚛️.",
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: "c3f49248-5ecf-46f9-8e33-caaa2a074721",
          name: "Kshitija K",
          username: "kshitija@gmail.com",
          handle: "xitija",
          profileAvatar:
            "https://fastly.picsum.photos/id/65/4912/3264.jpg?hmac=uq0IxYtPIqRKinGruj45KcPPzxDjQvErcxyS1tn7bG0",
        },
        {
          _id: "265d79ad-6e8d-4fda-b94f-b62410fdf51e",
          name: "John Doe",
          username: "johndoe@gmail.com",
          handle: "johndoe",
          profileAvatar: "https://picsum.photos/id/1009/150",
        },
      ],
      dislikedBy: [],
    },
    name: "Adarsh Balika",
    handle: "abalika",
    username: "adarshbalika@gmail.com",
    profileAvatar:
      "https://img.freepik.com/free-photo/closeup-smiling-young-beautiful-indian-woman_1262-2261.jpg",
    createdAt: "2023-05-29T00:55:00+05:30",
    updatedAt: formatDate(),
    comments: [],
  },
  {
    _id: "250f0be7-f903-4b21-9c5e-cf76fc8d70e2",
    content: `What features do you feel are missing in React DevTools? What problems do you struggle with while debugging React? Please reply with your ideas! 👇🥺`,
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    name: "Adarsh Balika",
    handle: "abalika",
    username: "adarshbalika@gmail.com",
    profileAvatar:
      "https://img.freepik.com/free-photo/closeup-smiling-young-beautiful-indian-woman_1262-2261.jpg",
    createdAt: "2023-05-30T00:55:00+05:30",
    updatedAt: formatDate(),
    comments: [
      {
        _id: "be60f739-643a-4ce7-a5c5-de1875680ab5",
        comment: "Nice!",
        name: "Sonal G",
        handle: "sona",
        username: "sona@gmail.com",
        profileAvatar: "https://picsum.photos/id/100/150",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: "265d79ad-6e8d-4fda-b94f-b62410fdf51e",
        comment: "Wow!",
        name: "John Doe",
        handle: "johndoe",
        username: "johndoe",
        profileAvatar: "https://picsum.photos/id/1012/150",
        createdAt: "2023-05-30T00:55:00+05:30",
        updatedAt: formatDate(),
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },
  {
    _id: uuid(),
    content: `Lately, I've been thinking about how we, as frontend developers, are perfectly positioned to create more effective learning experiences through "interactive playgrounds".`,
    likes: {
      likeCount: 3,
      likedBy: [
        {
          _id: "c3f49248-5ecf-46f9-8e33-caaa2a074721",
          name: "Kshitija K",
          username: "kshitija@gmail.com",
          handle: "xitija",
          profileAvatar:
            "https://fastly.picsum.photos/id/65/4912/3264.jpg?hmac=uq0IxYtPIqRKinGruj45KcPPzxDjQvErcxyS1tn7bG0",
        },
        {
          _id: "265d79ad-6e8d-4fda-b94f-b62410fdf51e",
          name: "John Doe",
          username: "johndoe@gmail.com",
          handle: "johndoe",
          profileAvatar: "https://picsum.photos/id/1009/150",
        },
        {
          _id: uuid(),
          name: "Nikita J",
          username: "nikita@gmail.com",
          handle: "nikiJ",
          profileAvatar: "https://picsum.photos/id/1009/150",
        },
      ],
      dislikedBy: [],
    },
    name: "Adarsh Balika",
    handle: "abalika",
    username: "adarshbalika@gmail.com",
    profileAvatar:
      "https://img.freepik.com/free-photo/closeup-smiling-young-beautiful-indian-woman_1262-2261.jpg",
    createdAt: "2023-01-30T00:55:00+05:30",
    updatedAt: formatDate(),
    comments: [],
  },
  {
    _id: uuid(),
    content:
      "🍿The React.js documentary trailer is OUT! 📆Mark your calendars: It premieres in February!.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    name: "Kshitija K",
    handle: "xitija",
    username: "kshitija@gmail.com",
    profileAvatar:
      "https://fastly.picsum.photos/id/65/4912/3264.jpg?hmac=uq0IxYtPIqRKinGruj45KcPPzxDjQvErcxyS1tn7bG0",
    createdAt: "2023-03-12T00:55:00+05:30",
    updatedAt: formatDate(),
    comments: [],
  },
  {
    _id: uuid(),
    content:
      "Writing unit tests and one kept failing. Thought it was something wrong with the way I had the test set up, but turns out that the test was right and was catching a bug in real time.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    name: "Kshitija K",
    handle: "xitija",
    username: "kshitija@gmail.com",
    profileAvatar:
      "https://fastly.picsum.photos/id/65/4912/3264.jpg?hmac=uq0IxYtPIqRKinGruj45KcPPzxDjQvErcxyS1tn7bG0",
    createdAt: "2023-05-30T00:55:00+05:30",
    updatedAt: formatDate(),
    comments: [
      {
        _id: "d9ffdbff-7b40-4202-a49c-c36f76d4b13f",
        comment: "Cool!",
        name: "Nikita J",
        handle: "nikiJ",
        username: "nikita@gmail.com",
        profileAvatar: "https://picsum.photos/id/1005/150",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: "b83b274-defe-4361-b0c3-1cd19959df91",
        comment: "Wow!",
        name: "Adarsh Balika",
        handle: "abalika",
        username: "adarshbalika@gmail.com",
        profileAvatar:
          "https://img.freepik.com/free-photo/closeup-smiling-young-beautiful-indian-woman_1262-2261.jpg",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },
  {
    _id: uuid(),
    content: "Made a fun Minion translator from NeoG Level0 using vanilla JS.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    name: "Kshitija K",
    handle: "xitija",
    username: "kshitija@gmail.com",
    profileAvatar:
      "https://fastly.picsum.photos/id/65/4912/3264.jpg?hmac=uq0IxYtPIqRKinGruj45KcPPzxDjQvErcxyS1tn7bG0",
    createdAt: "2023-02-19T00:55:00+05:30",
    updatedAt: formatDate(),
    comments: [],
  },
  {
    _id: uuid(),
    content: "@Reactjs is most popular library.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    name: "John Doe",
    handle: "johndoe",
    username: "johndoe@gmail.com",
    profileAvatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
    createdAt: "2023-05-29T00:55:00+05:30",
    updatedAt: formatDate(),
    comments: [],
  }
];
