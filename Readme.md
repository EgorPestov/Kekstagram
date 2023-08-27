# Kekstagram: a simple analogue of Instagram
by: Egor Pestov <egorpestov2012@yandex.ru>


---

Stack: HTML, CSS, JS, Babel

---

Kekstagram - a simple analogue of Instagram. The project serves as a platform for practicing native JavaScript and working with CSS. This is a single-page application.

The project incorporates the following functionality:

* Displaying data fetched from the server (using fetch) in the form of a feed of images (cards). Clicking on any of the cards will open up detailed information about it, including the number of likes and comments. If there are more than five comments, which are also obtained from the server, only five will be initially displayed on the page, accompanied by a "load more" button. This button will load additional comments in batches of five until all comments are shown.

* Photos can be sorted by the number of comments, displaying a random selection of ten, or in the order received from the server.

* Upon opening the menu, a drag-and-drop feature is available by clicking on the central icon. This allows users to upload any image to the interface, after which they can edit it by adjusting its scale and applying one of the available filters. Users can also adjust the intensity of the filter from 0 to 100%.

* Following this, users can add hashtags (extensive validation ensures that no more than five hashtags are allowed, they are not excessively short or long, do not consist solely of numbers, and are not duplicated) and the main post text (with validation for a maximum of 140 characters). Afterward, the content can be sent to the server. Various notification options are provided to indicate whether the image was successfully sent or if there was a server-side error. In case of an error, user-entered information will not be lost, and users will have the opportunity to attempt the submission again.

