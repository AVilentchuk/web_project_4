const customFetch = (url, properties) => {
  return fetch(url, properties)
    .then((response) => {
      if (response.ok) return response.json();
      return Promise.reject(
        `Failed with status:( ${response.status} ${response.statusText})`
      );
    })
    .catch((error) => console.log(error));
};

export default class Api {
  constructor({ groupId, apiKey, baseUrl }) {
    this.groupId = groupId;
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  getInitialCards() {
    return customFetch(`${this.baseUrl}${this.groupId}/cards`, {
      headers: {
        authorization: `${this.apiKey}`,
        "Content-Type": "application/json",
      },
    });
  }

  postNewCard(cardData) {
    return customFetch(`${this.baseUrl}${this.groupId}/cards/`, {
      method: "POST",
      headers: {
        authorization: `${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${cardData.name}`,
        link: `${cardData.link}`,
      }),
    });
  }

  deleteCardPost(cardId) {
    return customFetch(`${this.baseUrl}${this.groupId}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `${this.apiKey}`,
      },
    });
  }

  getProfile() {
    return customFetch(`${this.baseUrl}${this.groupId}/users/me`, {
      headers: {
        authorization: `${this.apiKey}`,
      },
    });
  }

  updateProfile({ name, about }) {
    return customFetch(`${this.baseUrl}${this.groupId}/users/me`, {
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
    });
  }

  updateProfilePhoto(avatarLink) {
    return customFetch(`${this.baseUrl}${this.groupId}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: `${avatarLink}`,
      }),
    });
  }

  likePhoto(cardId) {
    return customFetch(`${this.baseUrl}${this.groupId}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: `${this.apiKey}`,
      },
    });
  }

  dislikePhoto(cardId) {
    return customFetch(`${this.baseUrl}${this.groupId}/cards/likes/${cardId}`, {
      method: "Delete",
      headers: {
        authorization: `${this.apiKey}`,
      },
    });
  }
}
