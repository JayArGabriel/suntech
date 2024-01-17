<template>
      <div class="myform">
        <div>
          <json-forms
            :data={}
            :renderers="renderers"
            :schema="schema"
            :uischema="uischema"
            @change="onChange($event)"
            />
        </div>
        <v-btn :disabled="age < 18">Next</v-btn>
      </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { JsonForms } from "@jsonforms/vue";
import {
  defaultStyles,
  mergeStyles,
  vanillaRenderers,
} from "@jsonforms/vue-vanilla";

// mergeStyles combines all classes from both styles definitions into one
const myStyles = mergeStyles(defaultStyles, { control: { label: "mylabel" } });

const renderers = [
  ...vanillaRenderers,
  // here you can add custom renderers
];

const schema = {
  properties: {
    firstName: {
      type: "string"
    },
    LastName: {
      type: "string"
    },
    birthDay: {
      type: "string",
      format: "date"
    },
    email: {
      type: "string",
      format: "email"
    },
  },
};

const uischema = {
  type: "HorizontalLayout",
  elements: [
    {
      type: "VerticalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/firstName",
        },
        {
          type: "Control",
          scope: "#/properties/LastName",
        },
      ],
    },
    {
      type: "VerticalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/birthDay",
        },
        {
          type: "Control",
          scope: "#/properties/email",
          rule: {
            effect: "HIDE",
            condition: {
              scope: "#/properties/email"
            }
          },
        },
      ],
    },
  ],
};

export default defineComponent({
  name: "App",
  components: {
    JsonForms,
  },
  data() {
    return {
      // freeze renderers for performance gains
      renderers: Object.freeze(renderers),
      schema,
      uischema,
      age: 0
    };
  },
  mounted() {
    this.age = 0
  },
  methods: {
    onChange(event: any) {
      if(event?.data?.birthDay) {
        let dob = new Date(event?.data?.birthDay);  
        //calculate month difference from current date in time  
        let month_diff = Date.now() - dob.getTime();  
        //convert the calculated difference in date format  
        let age_dt = new Date(month_diff);   
        //extract year from date      
        let year = age_dt.getUTCFullYear();  
        //now calculate the age of the user  
        let age = Math.abs(year - 1970);
        this.age = age
        console.log(this.age)
        if(age > 18) uischema.elements[1].elements[1].rule.effect = 'SHOW'
        else uischema.elements[1].elements[1].rule.effect = 'HIDE'
      }
    }
  },
  provide() {
    return {
      styles: myStyles,
    };
  },
});
</script>

<style>
.mylabel {
  color: darkslategrey;
}

.vertical-layout {
  margin-left: 10px;
  margin-right: 10px;
}

.myform {
  width: 640px;
  margin: 0 auto;
  input {
    border-style: solid;
  }
}

.text-area {
  min-height: 80px;
}
</style>
