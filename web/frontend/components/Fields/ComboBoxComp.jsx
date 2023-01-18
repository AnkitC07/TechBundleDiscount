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
import { useState, useCallback, useMemo } from "react";
function ComboBoxComp(props) {
  // const tags = ['Rustic', 'Antique', 'Vinyl', 'Refurbished'];
  const [selectedTags, setSelectedTags] = useState([]);
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
    return props.products.filter((item) =>
      item.title.toLowerCase().includes(textFieldValue)
    );
    // }, 500);
    // return () => clearTimeout(getData);
  };

  const removeTag = () => {
    props.productsState([
      props.bundle.bundleProducts[props.i - 1],
      ...props.products,
    ]);
    if (props.i - 1 == 0 || props.i - 1 == 1) {
      props.bundle.bundleProducts[props.i - 1] = "";
    } else {
      props.bundle.bundleProducts.splice(props.i - 1, 1);
    }
    console.log(props.products, "Products");
  };

  const verticalContentMarkup =
    props.bundle.bundleProducts.length > 0 ? (
      <Stack spacing="extraTight" alignment="center">
        {/* {selectedTags.map((tag) => ( */}
        {props.bundle.bundleProducts[props.i - 1] !== "" ? (
          <Tag onRemove={() => removeTag()}>
            {props.bundle.bundleProducts[props.i - 1]?.title}
          </Tag>
        ) : null}

        {/* ))} */}
      </Stack>
    ) : null;

  const handelCheck = (x) => {
    console.log("Index", props.i - 1);
    console.log("BundelProducts=> ", props.bundle.bundleProducts);
    if (props.bundle.bundleProducts.length == 0) {
      props.bundle.bundleProducts = [...props.bundle.bundleProducts, x];
    } else {
      console.log("Slicing=>", props.bundle.bundleProducts[props.i - 1]);
      if (props.bundle.bundleProducts[props.i - 1] == "") {
        const index = props.products.findIndex((el) => el.id === x.id);
        props.products.splice(index, 1);
        props.productsState([...props.products]);
        props.bundle.bundleProducts[props.i - 1] = x;
      } else {
        props.products.push(props.bundle.bundleProducts[props.i - 1]);
        props.bundle.bundleProducts[props.i - 1] = x;
        const index = props.products.findIndex((el) => el.id === x.id);
        props.products.splice(index, 1);
        props.productsState([...props.products]);
      }
      console.log(props.products, "Products");
    }
    props.setBundle({ ...props.bundle });
  };

  console.log(props.products, "Main Products");
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
      const nameA = a.title.toUpperCase(); // ignore upper and lowercase
      const nameB = b.title.toUpperCase(); // ignore upper and lowercase
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
        label={`Product #${props.i}`}
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
                  handelCheck(x);

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
                    <span>{x.title}</span>
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
