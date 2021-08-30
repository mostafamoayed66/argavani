import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../actions";
import { MaterialButton, MaterialInput } from "../../components/MaterialUI";


import Grid from '@material-ui/core/Grid';
import './style.css';
/**
 * @author
 * @function AddressForm
 **/

const sts = {
  'انتخاب استان': ['انتخاب شهر'],
  'تهران': ['تهران', 'شاهدشهر', 'پیشوا', 'جوادآباد', 'ارجمند', 'ری', 'نصیرشهر', 'رودهن', 'اندیشه', 'نسیم شهر', 'صباشهر', 'ملارد', 'شمشک'],
  'خراسان رضوی': ['مشهد', 'درورد', 'نیل شهر', 'رباط سنگ', 'فریمان', 'گناباد', 'سبزوار', 'چناران', 'کلات', 'نصرت', 'کاشمر', 'کاشمر'],
}

const AddressForm = (props) => {
  const { initialData } = props;
  const [name, setName] = useState(initialData ? initialData.name : "");
  const [mobileNumber, setMobileNumber] = useState(
    initialData ? initialData.mobileNumber : ""
  );
  const [address, setAddress] = useState(
    initialData ? initialData.address : ""
  );
  const [state, setState] = useState(initialData ? initialData.state : "انتخاب استان");
  const [cityDistrictTown, setCityDistrictTown] = useState(
    initialData ? initialData.cityDistrictTown : ""
  );
  const [pinCode, setPinCode] = useState(
    initialData ? initialData.pinCode : ""
  );
  const [alternatePhone, setAlternatePhone] = useState(
    initialData ? initialData.alternatePhone : ""
  );
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [submitFlag, setSubmitFlag] = useState(false);
  const [id] = useState(initialData ? initialData._id : "");


  const setNewAddress = (e) => {
    props.setnewaddress(false)
  }

  const onAddressSubmit = (e) => {
    const payload = {
      address: {
        name,
        mobileNumber,
        address,
        state,
        cityDistrictTown,
        pinCode,
        alternatePhone,
      },
    };
    // console.log(payload);
    if (id) {
      payload.address._id = id;
    }
    if(name && mobileNumber && address && state && cityDistrictTown){
      dispatch(addAddress(payload));
      setSubmitFlag(true);
    }
  };

  useEffect(() => {
    // console.log("addressCount", user.address);
    if (submitFlag) {
      // console.log("where are we", user);
      let _address = {};
      if (id) {
        _address = {
          _id: id,
          name,
          mobileNumber,
          pinCode,
          address,
          cityDistrictTown,
          state,
          alternatePhone,
        };
      } else {
        _address = user.address.slice(user.address.length - 1)[0];
      }

      props.onSubmitForm(_address);
    }
  }, [address, alternatePhone, cityDistrictTown, id, mobileNumber, name, pinCode, props, state, submitFlag, user.address]);

  useEffect(() => {
    var element = document.querySelector('select');
    element.addEventListener('mousedown', function () {
      this.size = 4;
    });
    element.addEventListener('change', function () {
      this.blur();
    });
    element.addEventListener('blur', function () {
      this.size = 0;
    });

    var elemnt = document.querySelector('.selct');
    elemnt.addEventListener('mousedown', function () {
      this.size = 4;
    });
    elemnt.addEventListener('change', function () {
      this.blur();
    });
    elemnt.addEventListener('blur', function () {
      this.size = 0;
    });
  }, [])

  const renderAddressForm = () => {
    return (
      <>
        <Grid container>

          <Grid item xs={12} sm={6} className="addressChangeorAdd">
            <MaterialInput
              label="نام"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} className="addressChangeorAdd">
            <MaterialInput
              label="شماره تلفن"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={12} className="addressChangeorAdd">
            <MaterialInput
              label="آدرس"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>


          <Grid item xs={12} sm={6} className="addressChangeorAdd">
            {/* {console.log(sts[state])} */}
            <select name="select"
              value={state}
              dir="rtl"
              onChange={(e) => setState(e.target.value)}
              className="form-control selectpicker">
              {
                Object.keys(sts).map((name) => (
                  <option key={name} value={name} className="selectpickerOption">
                    {name}
                  </option>
                ))}
            </select>
          </Grid>
          <Grid item xs={12} sm={6} className="addressChangeorAdd">
            {console.log(cityDistrictTown)}
            <select
              name="select"
              value={cityDistrictTown}
              dir="rtl"
              onChange={(e) => setCityDistrictTown(e.target.value)}
              className="form-control selectpicker selct">
              {sts[state].map((name) => (
                <option key={name} value={name} className="selectpickerOption">
                  {name}
                </option>
              ))}
            </select>
          </Grid>


          <Grid item xs={12} sm={6} className="addressChangeorAdd">
            <MaterialInput
              label="شماره تلفن دیگر (اختیاری)"
              value={alternatePhone}
              onChange={(e) => setAlternatePhone(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} className="addressChangeorAdd">
            <MaterialInput
              label="کد پستی (اختیاری)"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
          </Grid>



          <Grid item xs={12} sm={12}>
            {props.withoutLayout ?
              (<MaterialButton
                title="در اینجا ذخیره و تحویل دهید"
                onClick={onAddressSubmit}
                style={{ width: "210px", margin: "20px 0" }}
              />
              ) : (
                <MaterialButton
                  title="ثبت آدرس جدید"
                  onClick={onAddressSubmit}
                  style={{ width: "150px", margin: "20px 0" }}
                />
              )}
          </Grid>

        </Grid>
      </>
    );
  };

  if (props.withoutLayout) {
    return <div>{renderAddressForm()}</div>;
  }

  return (
    <div className="checkoutStep" style={{ background: "#f5faff" }}>
      <div className={`checkoutHeader`}>
        <div>
          <span className="stepTitle">{"انصراف از ثبت آدرس جدید"}</span>
          <span className="stepNumber" onClick={setNewAddress} style={{ cursor: "pointer", padding: "3px 9px" }}>-</span>
        </div>
      </div>
      <div style={{ padding: "0 15px", paddingBottom: "20px", boxSizing: "border-box" }}>
        {renderAddressForm()}
      </div>
    </div>
  );
};

export default AddressForm;
