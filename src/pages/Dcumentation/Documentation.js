import React from "react";
import image1 from "../../../src/images/documentation1.png";
import image2 from "../../../src/images/documentation2.png";
import image3 from "../../../src/images/documentation3.png";
import "./Documentation.css";

const ContactUs = () => {
  return (
    <div className="doc-container">
      <div className="header-documentation"></div>
      <div className="documentation-container">
        <section className="section">
          <div className="description-documentation">
            <h2>Categories and types</h2>
            <p>
              On the products page, you will find a list of categories
              available. These categories allow you to filter and display
              products that belong to a specific category. By selecting a
              category from the list, the products related to that category will
              be shown. To illustrate, imagine the products page displaying
              various categories such as Spain, Egypt, and Lebanon. These types
              serve as filters. This functionality enables you to easily find
              and explore products from specific categories of interest.
            </p>
          </div>
          <img src={image1} className="image-documentation"></img>
        </section>
        <section className="section">
          <div className="description-documentation">
            <h2>choose The Favorite</h2>
            <p>
              Our website offers a feature that allows you to select and save
              your favorite products. By clicking on the "Add to Your Favorites"
              button, you can indicate your interest in a particular product. If
              you change your mind, you can simply click the button again to
              remove it from your favorites. Once you have finished selecting
              your favorite products, you can visit the "Your Favorites" page by
              clicking on the designated button. In the second half of the
              picture, you will notice the option to save the selected products.
              However, please note that in order to save them to your profile,
              you need to be logged into your account. This ensures that your
              chosen products are associated with your personal profile and can
              be easily accessed whenever you revisit the website.
            </p>
          </div>
          <img src={image2} className="image-documentation"></img>
        </section>
        <section className="section">
          <div className="description-documentation">
            <h2>Personal Information</h2>
            <p>
              Once you are logged into your account, you can access your profile
              page by clicking on the icon depicted in the picture. On your
              profile page, you will find detailed information about yourself,
              including your name, email address, and phone number.
              Additionally, you can view and manage your favorite products. If
              you choose to explore different options or make changes, the data
              will be automatically saved in your profile. This means that you
              can easily refer back to your previous choices, such as "Choice 1"
              or "Choice 2". Your profile serves as a centralized hub where you
              can conveniently access and modify your personal information and
              preferences.
            </p>
          </div>
          <img src={image3} className="image-documentation"></img>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;
