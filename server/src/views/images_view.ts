import Image from '../models/Image';

export default {
  render(image: Image) {
    return {
      id: image.id,
      web_url: `http://localhost:3333/uploads/${image.path}`,
      mobile_url: `http://10.0.2.2:3333/uploads/${image.path}`,
    };
  },

  renderMany(images: Image[]) {
    return images.map((image) => this.render(image));
  },
};
