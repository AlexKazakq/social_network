"use strict";(self.webpackChunksamurai_way=self.webpackChunksamurai_way||[]).push([[369],{2369:function(s,e,t){t.r(e),t.d(e,{ProfileAPIComponent:function(){return E},default:function(){return G}});var n=t(1413),i=t(5671),r=t(3144),o=t(136),u=t(8557),a=t(2791),l=t(885),c="ProfileInfo_descriptionBlock__2XdJx",d="ProfileInfo_mainPhoto__XfMvC",h="ProfileInfo_contact__5-BmK",f=t(3445),p=t(184),j=function(s){var e=(0,a.useState)(!1),t=(0,l.Z)(e,2),n=t[0],i=t[1],r=(0,a.useState)(s.status),o=(0,l.Z)(r,2),u=o[0],c=o[1];(0,a.useEffect)((function(){c(s.status)}),[s.status]);return(0,p.jsxs)("div",{children:[!n&&(0,p.jsxs)("div",{children:[(0,p.jsx)("b",{children:"Status: "}),(0,p.jsx)("span",{onDoubleClick:function(){i(!0)},children:s.status||"No status"})]}),n&&(0,p.jsx)("div",{children:(0,p.jsx)("input",{autoFocus:!0,onBlur:function(){i(!1),s.updateStatusThunk(u)},onChange:function(s){c(s.currentTarget.value)},value:u})})]})},x=t(4353),v=t(5413),m=t(704),k=t(9234),b=(0,m.Z)({form:"edit-profile"})((function(s){var e=s.handleSubmit,t=s.profile,n=s.error;return(0,p.jsxs)("form",{onSubmit:e,children:[(0,p.jsx)("div",{children:(0,p.jsx)("button",{children:"save"})}),n&&(0,p.jsx)("div",{className:k.Z.formSummaryError,children:n}),(0,p.jsxs)("div",{children:[(0,p.jsx)("b",{children:"Full Name"}),": ",(0,v.Gr)("Full name","fullName",[],v.II)]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("b",{children:"Looking for a job"}),": ",(0,v.Gr)("","lookingForAJob",[],v.II,{type:"checkbox"})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("b",{children:"My professional skills"}),": ",(0,v.Gr)("My professional skills","lookingForAJobDescription",[],v.gx)]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("b",{children:"About me"}),": ",(0,v.Gr)("About me","aboutMe",[],v.gx)]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("b",{children:"Contacts"}),": ",Object.keys(t.contacts).map((function(s){return(0,p.jsxs)("div",{className:h,children:[(0,p.jsx)("b",{children:s}),": ",(0,v.Gr)(s,"contacts."+s,[],v.II)]},s)}))]})]})})),g=function(s){var e=s.profile,t=s.status,n=s.updateStatusThunk,i=s.isOwner,r=s.savePhoto,o=s.saveProfile,u=(0,a.useState)(!1),h=(0,l.Z)(u,2),v=h[0],m=h[1];if(!e)return(0,p.jsx)(f.p,{});return(0,p.jsx)("div",{children:(0,p.jsxs)("div",{className:c,children:[(0,p.jsx)("img",{src:e.photos.large||x,className:d}),i&&(0,p.jsx)("input",{type:"file",onChange:function(s){var e;null!==(e=s.target.files)&&void 0!==e&&e.length&&r(s.target.files[0])}}),v?(0,p.jsx)(b,{initialValues:e,profile:e,onSubmit:function(s){o(e).then((function(){m(!1)}))}}):(0,p.jsx)(P,{profile:e,isOwner:i,goToEditMode:function(){return m(!0)}}),(0,p.jsx)(j,{status:t,updateStatusThunk:n})]})})},P=function(s){var e=s.profile,t=s.isOwner,n=s.goToEditMode;return(0,p.jsxs)("div",{children:[t&&(0,p.jsx)("div",{children:(0,p.jsx)("button",{onClick:n,children:"edit"})}),(0,p.jsxs)("div",{children:[(0,p.jsx)("b",{children:"Full Name"}),": ",e.fullName]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("b",{children:"Looking for a job"}),": ",e.lookingForAJob?"yes":"no"]}),e.lookingForAJob&&(0,p.jsxs)("div",{children:[(0,p.jsx)("b",{children:"My professional skills"}),": ",e.lookingForAJobDescription]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("b",{children:"About me"}),": ",e.aboutMe]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("b",{children:"Contacts"}),": ",Object.keys(e.contacts).map((function(s){return(0,p.jsx)(S,{contactTitle:s,contactValue:e.contacts[s]},s)}))]})]})},S=function(s){var e=s.contactTitle,t=s.contactValue;return(0,p.jsxs)("div",{className:h,children:[(0,p.jsx)("b",{children:e}),": ",t]})},_=t(7496),y="MyPosts_postsBlock__3e4Ds",T="MyPosts_posts__6EdvY",w="Post_item__+LDvX",I=function(s){return(0,p.jsxs)("div",{className:w,children:[(0,p.jsx)("img",{src:"https://www.kino-teatr.ru/movie/kadr/36398/pv_82325.jpg",alt:""}),s.message,(0,p.jsx)("div",{children:(0,p.jsxs)("span",{children:[s.likesCount," likes"]})})]})},C=t(3079),N=(0,a.memo)((function(s){var e=s.posts.map((function(s){return(0,p.jsx)(I,{message:s.message,likesCount:s.likesCount},s.id)}));return(0,p.jsxs)("div",{className:y,children:[(0,p.jsx)("h3",{children:"My post"}),(0,p.jsx)(M,{onSubmit:function(e){s.addPost(e.newPostText)}}),(0,p.jsx)("div",{className:T,children:e})]})})),A=(0,C.D)(10),M=(0,m.Z)({form:"ProfileAddNewPostForm"})((function(s){return(0,p.jsxs)("form",{onSubmit:s.handleSubmit,children:[(0,p.jsx)("div",{children:(0,v.Gr)("Post message","newPostText",[C.l,A],v.gx)}),(0,p.jsxs)("div",{children:[(0,p.jsx)("button",{children:"Add post"}),(0,p.jsx)("button",{children:"Remove"})]})]})})),Z=t(8687),F=(0,Z.$j)((function(s){return{posts:s.profilePage.posts}}),(function(s){return{addPost:function(e){s((0,_.Wl)(e))}}}))(N),O=function(s){return(0,p.jsxs)("div",{children:[(0,p.jsx)(g,{isOwner:s.isOwner,profile:s.profile,status:s.status,updateStatusThunk:s.updateStatusThunk,saveProfile:s.saveProfile,savePhoto:s.savePhoto}),(0,p.jsx)(F,{})]})},D=t(9271),J=t(7781),E=function(s){(0,o.Z)(t,s);var e=(0,u.Z)(t);function t(){return(0,i.Z)(this,t),e.apply(this,arguments)}return(0,r.Z)(t,[{key:"refreshProfile",value:function(){var s=+this.props.match.params.userId;s||(s=this.props.authorizedUserId)||this.props.history.push("/login"),this.props.getUserProfileThunk(s),this.props.getStatusThunk(s)}},{key:"componentDidMount",value:function(){this.refreshProfile()}},{key:"componentDidUpdate",value:function(s,e){this.props.match.params.userId!==s.match.params.userId&&this.refreshProfile()}},{key:"render",value:function(){return(0,p.jsx)(O,(0,n.Z)((0,n.Z)({},this.props),{},{isOwner:!this.props.match.params.userId,profile:this.props.profile,status:this.props.status,updateStatusThunk:this.props.updateStatusThunk,savePhoto:this.props.savePhoto}))}}]),t}(a.Component),G=(0,J.qC)((0,Z.$j)((function(s){return{profile:s.profilePage.profile,status:s.profilePage.status,authorizedUserId:s.auth.id,isAuth:s.auth.isAuth}}),{getUserProfileThunk:_.SO,getStatusThunk:_.$b,updateStatusThunk:_.dw,savePhoto:_.Ju,saveProfile:_.Ii}),D.EN)(E)}}]);
//# sourceMappingURL=369.ccad485e.chunk.js.map