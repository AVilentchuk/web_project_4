import { initialCards } from "../scripts/initialCards";
const customFetch = (url, headers) => {
  fetch(url, headers);
};
export default class Api {
  constructor({ groupId, apiKey, baseUrl }) {
    this.groupId = groupId;
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }
  getInitialCards() {
    return fetch(`${this.baseUrl}${this.groupId}/cards`, {
      headers: {
        authorization: `${this.apiKey}`,
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        return Promise.reject(`Failed with status: ${response.status}`);
      })
      .then((data) => {
        console.log(`Fetched ${data.length} cards successfully`);
        return data;
      })
      .catch((error) => console.log(error));
  }
  refreshCard(cardId) {
    return fetch(`${this.baseUrl}${this.groupId}/cards/likes/${cardId}`, {
      headers: {
        authorization: `${this.apiKey}`,
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        return Promise.reject(`Failed with status: ${response.status}`);
      })
      .catch((error) => console.log(error));
  }

  postNewCard(cardData) {
    return fetch(`${this.baseUrl}${this.groupId}/cards/`, {
      method: "POST",
      headers: {
        authorization: `${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${cardData.name}`,
        link: `${cardData.link}`,
      }),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) return response.json();
        return Promise.reject(
          `Failed with status:( ${response.status} ${response.statusText})`
        );
      })
      .catch((error) => console.log(error));
  }
  deleteCardPost(cardId) {
    return fetch(`${this.baseUrl}${this.groupId}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `${this.apiKey}`,
      },
    }).then((response) => {
      if (response.ok) return response.json();
      return Promise.reject(`Failed with status: ${response.status}`);
    });
  }

  getProfile() {
    return fetch(`${this.baseUrl}${this.groupId}/users/me`, {
      method: "GET",
      headers: {
        authorization: `${this.apiKey}`,
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        return Promise.reject(`Failed with status: ${response.status}`);
      })

      .catch((error) => console.log(error));
  }

  updateProfile({ name, about }) {
    return fetch(`${this.baseUrl}${this.groupId}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`,
        _id: `${this.apiKey}`,
        cohort: `${this.groupId}`,
      }),
    }).then((response) => {
      if (response.ok) return response.json();
      else
        return Promise.reject(
          `Failed with status: ${response.status} \n ${response.response}`
        );
    });
  }

  updateProfilePhoto(avatarLink) {
    return fetch(`${this.baseUrl}${this.groupId}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: `${avatarLink}`,
      }),
    }).then((response) => {
      if (response.ok) return response.json();
      return Promise.reject(`Failed with status: ${response.status}`);
    });
  }

  likePhoto(cardId) {
    return fetch(`${this.baseUrl}${this.groupId}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: `${this.apiKey}`,
      },
    }).then((response) => {
      if (response.ok) return response.json();
      return Promise.reject(`Failed with status: ${response.status}`);
    });
  }

  dislikePhoto(cardId) {
    return fetch(`${this.baseUrl}${this.groupId}/cards/likes/${cardId}`, {
      method: "Delete",
      headers: {
        authorization: `${this.apiKey}`,
      },
    }).then((response) => {
      if (response.ok) return response.json();
      return Promise.reject(`Failed with status: ${response.status}`);
    });
  }
}
