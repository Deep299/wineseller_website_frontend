import PropTypes from "prop-types";
import clsx from "clsx"
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SectionTitle from "../../components/section-title/SectionTitle";
import ProductGridTwo from "./ProductGridTwo";

const TabProductTwo = ({ spaceBottomClass, category }) => {
  return (
    <div className={clsx("product-area", spaceBottomClass)}>
      <div className="container">
        <SectionTitle titleText="DAILY DEALS!" positionClass="text-center" />
        <Tab.Container defaultActiveKey="bestSeller">
          <Nav
            variant="pills"
            className="product-tab-list pt-30 pb-55 text-center"
          >
            <Nav.Item>
              
                <h4 className="custom-heading">Best Selling Products</h4>
              
            </Nav.Item>
          </Nav>
          <Tab.Content>
           {/*  <Tab.Pane eventKey="newArrival">
              <div className="row three-column">
                <ProductGridTwo
                  category={category}
                  type="new"
                  limit={6}
                  spaceBottomClass="mb-25"
                />
              </div>
            </Tab.Pane> */}
            <Tab.Pane eventKey="bestSeller">
              <div className="row three-column">
                <ProductGridTwo
                  category={category}
                  type="bestSeller"
                  limit={6}
                  spaceBottomClass="mb-25"
                />
              </div>
            </Tab.Pane>
            {/* <Tab.Pane eventKey="saleItems">
              <div className="row three-column">
                <ProductGridTwo
                  category={category}
                  type="saleItems"
                  limit={6}
                  spaceBottomClass="mb-25"
                />
              </div>
            </Tab.Pane> */}
          </Tab.Content>
        </Tab.Container>
        <div className="view-more text-center mt-20 toggle-btn6 col-12">
          <Link
            className="loadMore6"
            to={process.env.PUBLIC_URL + "/shop-grid-standard"}
          >
            VIEW MORE PRODUCTS
          </Link>
        </div>
      </div>
    </div>
  );
};

TabProductTwo.propTypes = {
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string
};

export default TabProductTwo;
