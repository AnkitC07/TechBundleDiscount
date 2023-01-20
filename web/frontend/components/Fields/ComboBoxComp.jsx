import {
  Listbox,
  Combobox,
  Icon,
  Stack,
  Tag,
  TextField,
} from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";
import { useEffect } from "react";
import { useState } from "react";
function ComboBoxComp(props) {
  const [textFieldValue, setTextFieldValue] = useState("");
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = () =>
    setPopoverActive((popoverActive) => !popoverActive);

  const handleTextFieldChange = (value) => {
    // props.products.filter((item) => item.title.toLowerCase().includes(value));
    console.log(search());
    setTextFieldValue(value);
  };

  const search = () => {
    // const getData = setTimeout(() => {
    if (props.type == "BundleProducts") {
      return props.products.filter((item) =>
        item.title.toLowerCase().includes(textFieldValue)
      );
    } else {
      return props.products.filter((item) =>
        item.first_name.toLowerCase().includes(textFieldValue)
      );
    }
    // }, 500);
    // return () => clearTimeout(getData);
  };

  const verticalContentMarkup =
    props.type == "BundleProducts" ? (
      props.bundle.bundleProducts.length > 0 ? (
        <Stack spacing="extraTight" alignment="center">
          {/* {selectedTags.map((tag) => ( */}
          {props.bundle.bundleProducts[props.i - 1] !== "" ? (
            <Tag onRemove={() => props.removeTag(props.i - 1)}>
              {props.bundle.bundleProducts[props.i - 1]?.title}
            </Tag>
          ) : null}

          {/* ))} */}
        </Stack>
      ) : null
    ) : props.bundle.bundleProducts.length > 0 ? (
      <Stack spacing="extraTight" alignment="center">
        {props.bundle.advanceSetting.targetCustomer.targetCustomerSelected.map(
          (x, i) => (
            <Tag key={x.id.toString()} onRemove={() => props.removeTag(i)}>
              {x.email}
            </Tag>
          )
        )}
      </Stack>
    ) : null;

  // const handelCheck = (x) => {
  //   console.log("Index", props.i - 1);
  //   console.log("BundelProducts=> ", props.bundle.bundleProducts);
  //   if (props.bundle.bundleProducts.length == 0) {
  //     props.bundle.bundleProducts = [...props.bundle.bundleProducts, x];
  //   } else {
  //     console.log("Slicing=>", props.bundle.bundleProducts[props.i - 1]);
  //     if (props.bundle.bundleProducts[props.i - 1] == "") {
  //       const index = props.products.findIndex((el) => el.id === x.id);
  //       props.products.splice(index, 1);
  //       props.productsState([...props.products]);
  //       props.bundle.bundleProducts[props.i - 1] = x;
  //     } else {
  //       props.products.push(props.bundle.bundleProducts[props.i - 1]);
  //       props.bundle.bundleProducts[props.i - 1] = x;
  //       const index = props.products.findIndex((el) => el.id === x.id);
  //       props.products.splice(index, 1);
  //       props.productsState([...props.products]);
  //     }
  //     console.log(props.products, "Products");
  //   }
  //   props.setBundle({ ...props.bundle });
  // };

  //     useEffect(() => {
  //     if (textFieldValue != "") {
  //       const getData = setTimeout(() => {
  //         props.productsState([
  //           ...props.products.filter((item) =>
  //             item.title.toLowerCase().includes(textFieldValue)
  //           ),
  //         ]);
  //       }, 500);
  //       return () => clearTimeout(getData);
  //     }
  //   }, [textFieldValue]);

  useEffect(() => {
    props.products.sort(function (a, b) {
      let nameA;
      let nameB;
      if (props.type == "BundleProducts") {
        nameA = a.title.toUpperCase(); // ignore upper and lowercase
        nameB = b.title.toUpperCase(); // ignore upper and lowercase
      } else {
        nameA = a.first_name.toUpperCase(); // ignore upper and lowercase
        nameB = b.first_name.toUpperCase(); // ignore upper and lowercase
      }
      // sort in an ascending order
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
  }, [props.products]);

  return (
    <>
      <TextField
        label={props.type == "BundleProducts" ? `Product #${props.i}` : ""}
        onFocus={togglePopoverActive}
        onBlur={() => {
          setTimeout(() => {
            setPopoverActive(false);
          }, 200);
        }}
        prefix={""}
        value={textFieldValue}
        onChange={(e) => handleTextFieldChange(e)}
        placeholder="Select a product"
        autoComplete="off"
        className={"selected_pro"}
        verticalContent={verticalContentMarkup}
      />
      {popoverActive ? (
        <div className="product_show">
          <ul className="products_li selected_pro">
            {console.log(search())}
            {search().map((x, i) => (
              <li
                key={`${x.id.toString()}`}
                className="selected_pro"
                onClick={(e) => {
                  props.handelCheck(x, props.i - 1);
                  //   setTimeout(() => {
                  togglePopoverActive();
                  //   }, 200);
                }}
              >
                {/* {console.log(x)} */}
                <div
                  className="selected_pro product_list save_bar_display_block"
                  id={x.id}
                  data-pro_id={x.id}
                  data-pro_title={x.title}
                >
                  <div className="selected_pro pro_image">
                    <img
                      src={x.image ? x.image.src : "no_image.png"}
                      className="imgae_res selected_pro"
                    />
                  </div>
                  <div className="product_title selected_pro">
                    {props.type == "BundleProducts" ? (
                      <span>{x.title}</span>
                    ) : (
                      <span>{x.email}</span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default ComboBoxComp;
