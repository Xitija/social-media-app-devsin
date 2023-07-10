import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: "1b83b274-defe-4361-b0c3-1cd19959df91",
    name: "Adarsh Balika",
    bio: "Hi! I am a frontend developer",
    website: "https://adarshbalika.netlify.app/",
    handle: "abalika",
    username: "adarshbalika@gmail.com",
    password: "adarshBalika123",
    profileAvatar:"https://img.freepik.com/free-photo/closeup-smiling-young-beautiful-indian-woman_1262-2261.jpg",
      // "https://miro.medium.com/v2/resize:fit:720/format:webp/1*wnZZIbN2yrfapCJ7hDYMEA.png",
    following: [
      {
        _id: "c3f49248-5ecf-46f9-8e33-caaa2a074721",
        name: "Kshitija K",
        handle: "xitija",
        username: "kshitija@gmail.com",
        profileAvatar: "https://fastly.picsum.photos/id/65/4912/3264.jpg?hmac=uq0IxYtPIqRKinGruj45KcPPzxDjQvErcxyS1tn7bG0",
      },
    ],
    followers: [
      {
        _id:"c3f49248-5ecf-46f9-8e33-caaa2a074721",
        name: "Kshitija K",
        handle: "xitija",
        username: "kshitija@gmail.com",
        profileAvatar: "https://fastly.picsum.photos/id/65/4912/3264.jpg?hmac=uq0IxYtPIqRKinGruj45KcPPzxDjQvErcxyS1tn7bG0",
      },
      {
        _id: "265d79ad-6e8d-4fda-b94f-b62410fdf51e",
        name: "John Doe",
        handle: "johndoe",
        username: "johndoe@gmail.com",
        profileAvatar: "https://picsum.photos/id/1009/150",
      },
      {
        _id: "be60f739-643a-4ce7-a5c5-de1875680ab5",
        name: "Sonal G",
        handle: "sona",
        username: "sona@gmail.com",
        profileAvatar: "https://picsum.photos/id/100/150",
      },
      {
        _id: "d9ffdbff-7b40-4202-a49c-c36f76d4b13f",
        name: "Nikita J",
        handle: "nikiJ",
        username: "nikita@gmail.com",
        profileAvatar: "https://picsum.photos/id/1005/150",
      },
    ],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "c3f49248-5ecf-46f9-8e33-caaa2a074721",
    name: "Kshitija K",
    bio: "Hi! I am a Web-Developer",
    website: "https://adarshbalika.netlify.app/",
    handle: "xitija",
    username: "kshitija@gmail.com",
    password: "pass12345",
    profileAvatar: "https://fastly.picsum.photos/id/65/4912/3264.jpg?hmac=uq0IxYtPIqRKinGruj45KcPPzxDjQvErcxyS1tn7bG0",
    following: [
      {
        _id: "d9ffdbff-7b40-4202-a49c-c36f76d4b13f",
        name: "Nikita J",
        handle: "nikiJ",
        username: "nikita@gmail.com",
        profileAvatar: "https://picsum.photos/id/100/150",
      },
      {
        _id: "1b83b274-defe-4361-b0c3-1cd19959df91",
        name: "Adarsh Balika",
        handle: "abalika",
        username: "adarshbalika@gmail.com",
        profileAvatar:
          "https://miro.medium.com/v2/resize:fit:720/format:webp/1*wnZZIbN2yrfapCJ7hDYMEA.png",
      },
    ],
    followers: [
      {
        _id: "265d79ad-6e8d-4fda-b94f-b62410fdf51e",
        name: "John Doe",
        handle: "johndoe",
        username: "johndoe@gmail.com",
        profileAvatar: "https://picsum.photos/id/1009/150",
      },
      {
        _id: "be60f739-643a-4ce7-a5c5-de1875680ab5",
        name: "Sonal G",
        handle: "sona",
        username: "sona@gmail.com",
        profileAvatar: "https://picsum.photos/id/100/150",
      },
      {
        _id: "d9ffdbff-7b40-4202-a49c-c36f76d4b13f",
        name: "Nikita J",
        handle: "nikiJ",
        username: "nikita@gmail.com",
        profileAvatar: "https://picsum.photos/id/1005/150",
      },
    ],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "d9ffdbff-7b40-4202-a49c-c36f76d4b13f",
    name: "Nikita J",
    bio: "Hi! I am a Web-Developer",
    website: "https://adarshbalika.netlify.app/",
    handle: "nikiJ",
    username: "nikita@gmail.com",
    password: "pass12345",
    profileAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    following: [
      {
        _id: "1b83b274-defe-4361-b0c3-1cd19959df91",
        name: "Adarsh Balika",
        handle: "abalika",
        username: "adarshbalika@gmail.com",
        profileAvatar:
          "https://miro.medium.com/v2/resize:fit:720/format:webp/1*wnZZIbN2yrfapCJ7hDYMEA.png",
      },
      {
        _id:"c3f49248-5ecf-46f9-8e33-caaa2a074721",
        name: "Kshitija K",
        handle: "xitija",
        username: "kshitija@gmail.com",
        profileAvatar: "https://fastly.picsum.photos/id/65/4912/3264.jpg?hmac=uq0IxYtPIqRKinGruj45KcPPzxDjQvErcxyS1tn7bG0",
      },
    ],
    followers: [
      {
        _id: "265d79ad-6e8d-4fda-b94f-b62410fdf51e",
        name: "John Doe",
        handle: "johndoe",
        username: "johndoe@gmail.com",
        profileAvatar: "https://picsum.photos/id/1009/150",
      },
      {
        _id: "be60f739-643a-4ce7-a5c5-de1875680ab5",
        name: "Sonal G",
        handle: "sona",
        username: "sona@gmail.com",
        profileAvatar: "https://picsum.photos/id/100/150",
      },
      {
        _id: "c3f49248-5ecf-46f9-8e33-caaa2a074721",
        name: "Kshitija K",
        handle: "xitija",
        username: "kshitija@gmail.com",
        profileAvatar: "https://fastly.picsum.photos/id/65/4912/3264.jpg?hmac=uq0IxYtPIqRKinGruj45KcPPzxDjQvErcxyS1tn7bG0",
      },
    ],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "be60f739-643a-4ce7-a5c5-de1875680ab5",
    name: "Sonal G",
    bio: "Hi! I am a Web-Developer",
    website: "https://adarshbalika.netlify.app/",
    handle: "sona",
    username: "sona@gmail.com",
    password: "pass12345",
    profileAvatar: "https://images.unsplash.com/photo-1505999407077-7937810b98ae",
    following: [
      {
        _id: "1b83b274-defe-4361-b0c3-1cd19959df91",
        name: "Adarsh Balika",
        handle: "abalika",
        username: "adarshbalika@gmail.com",
        profileAvatar:
          "https://miro.medium.com/v2/resize:fit:720/format:webp/1*wnZZIbN2yrfapCJ7hDYMEA.png",
      },
      {
        _id: "c3f49248-5ecf-46f9-8e33-caaa2a074721",
        name: "Kshitija K",
        handle: "xitija",
        username: "kshitija@gmail.com",
        profileAvatar: "https://fastly.picsum.photos/id/65/4912/3264.jpg?hmac=uq0IxYtPIqRKinGruj45KcPPzxDjQvErcxyS1tn7bG0",
      },
    ],
    followers: [
      {
        _id: "265d79ad-6e8d-4fda-b94f-b62410fdf51e",
        name: "John Doe",
        handle: "johndoe",
        username: "johndoe@gmail.com",
        profileAvatar: "https://picsum.photos/id/1009/150",
      },
    ],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "265d79ad-6e8d-4fda-b94f-b62410fdf51e",
    name: "John Doe",
    bio: "Hi! I am a Web-Developer",
    website: "https://adarshbalika.netlify.app/",
    handle: "johndoe",
    username: "johndoe@gmail.com",
    password: "pass12345",
    profileAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
    following: [
      {
        _id: "1b83b274-defe-4361-b0c3-1cd19959df91",
        name: "Adarsh Balika",
        handle: "abalika",
        username: "adarshbalika@gmail.com",
        profileAvatar:
          "https://miro.medium.com/v2/resize:fit:720/format:webp/1*wnZZIbN2yrfapCJ7hDYMEA.png",
      },
      {
        _id: "c3f49248-5ecf-46f9-8e33-caaa2a074721",
        name: "Kshitija K",
        handle: "xitija",
        username: "kshitija@gmail.com",
        profileAvatar: "https://fastly.picsum.photos/id/65/4912/3264.jpg?hmac=uq0IxYtPIqRKinGruj45KcPPzxDjQvErcxyS1tn7bG0",
      },
      {
        _id: "be60f739-643a-4ce7-a5c5-de1875680ab5",
        name: "Sonal G",
        handle: "sona",
        username: "sona@gmail.com",
        profileAvatar: "https://picsum.photos/id/100/150",
      },
      {
        _id: "d9ffdbff-7b40-4202-a49c-c36f76d4b13f",
        name: "Nikita J",
        handle: "nikiJ",
        username: "nikita@gmail.com",
        profileAvatar: "https://picsum.photos/id/1005/150",
      }
    ],
    followers: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
