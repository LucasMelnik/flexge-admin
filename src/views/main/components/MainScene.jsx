import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TopBar from '../../../core/layout/TopBar';
import LeftSidebar from '../../../core/layout/LeftSidebar';
import MainContent from '../../../core/layout/MainContent';
import Menu from '../../../core/layout/Menu';
import MenuItem from '../../../core/layout/MenuItem';
import PermissionValidator from '../../../core/layout/PermissionValidator';
import MenuSection from '../../../core/layout/MenuSection';
import SubMenu from '../../../core/layout/SubMenu';
import ConfirmDialogContainer from './ConfirmDialogContainer';
import NotificationContainer from './NotificationContainer';

class MainScene extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  componentDidMount() {
    const $ = window.$;
    var width = window.innerWidth;
    if ($('body').hasClass('chat-open') || $('body').hasClass('sidebar-collapse')) {
      this.mainmenuCollapsed();
    } else if (width <= 1280) {
      // small window
      $('.page-topbar').addClass('sidebar_shift').removeClass('chat_shift');
      $('.page-sidebar').addClass('collapseit').removeClass('expandit');
      $('body').removeClass('menuexpanded');
      $('#main-content').addClass('sidebar_shift').removeClass('chat_shift');
      $('.page-chatapi').removeClass('showit').addClass('hideit');
      $('.chatapi-windows').removeClass('showit').addClass('hideit');
      this.mainmenuCollapsed();
    } else {
      // large window
      $('.page-topbar').removeClass('sidebar_shift chat_shift');
      $('.page-sidebar').removeClass('collapseit chat_shift');
      $('#main-content').removeClass('sidebar_shift chat_shift');
      this.mainmenuScroll();
    }

    $(".page-topbar li.profile").addClass("showopacity");

    $('#main-menu-wrapper li a').click(function(e) {

        if ($(this).next().hasClass('sub-menu') === false) {
            return;
        }

        var parent = $(this).parent().parent();
        var sub = $(this).next();

        parent.children('li.open').children('.sub-menu').slideUp(200);
        parent.children('li.open').children('a').children('.arrow').removeClass('open');
        parent.children('li').removeClass('open');

        if (sub.is(":visible")) {
            $(this).find(".arrow").removeClass("open");
            sub.slideUp(200);
        } else {
            $(this).parent().addClass("open");
            $(this).find(".arrow").addClass("open");
            sub.slideDown(200);
        }

    });

    $("body").click(function(e) {
        $(".page-sidebar.collapseit .wraplist li.open .sub-menu").attr("style","");
        $(".page-sidebar.collapseit .wraplist li.open").removeClass("open");
        $(".page-sidebar.chat_shift .wraplist li.open .sub-menu").attr("style","");
        $(".page-sidebar.chat_shift .wraplist li.open").removeClass("open");
    });

    $('.page-topbar .sidebar_toggle').on('click', () => {
      var chatarea = $(".page-chatapi");
      var chatwindow = $(".chatapi-windows");
      var topbar = $(".page-topbar");
      var mainarea = $("#main-content");
      var menuarea = $(".page-sidebar");

      if (menuarea.hasClass("collapseit") || menuarea.hasClass("chat_shift")) {
        menuarea.addClass("expandit").removeClass("collapseit").removeClass("chat_shift");
        $("body").addClass("menuexpanded");
        topbar.removeClass("sidebar_shift").removeClass("chat_shift");
        mainarea.removeClass("sidebar_shift").removeClass("chat_shift");
        chatarea.addClass("hideit").removeClass("showit");
        chatwindow.addClass("hideit").removeClass("showit");
        this.mainmenuScroll();
      } else {
        menuarea.addClass("collapseit").removeClass("expandit").removeClass("chat_shift");
        $("body").removeClass("menuexpanded");
        topbar.addClass("sidebar_shift").removeClass("chat_shift");
        mainarea.addClass("sidebar_shift").removeClass("chat_shift");
        this.mainmenuCollapsed();
      }
    });
  }

  mainmenuCollapsed = () => {
    const $ = window.$;
    if ($('.page-sidebar.chat_shift #main-menu-wrapper').length > 0 || $('.page-sidebar.collapseit #main-menu-wrapper').length > 0) {
      //console.log('collapse menu');
      var topbar = $('.page-topbar').height();
      var windowheight = window.innerHeight;
      var minheight = windowheight - topbar;
      var fullheight = $('.page-container #main-content .wrapper').height();

      var height = fullheight;

      if (fullheight < minheight) {
          height = minheight;
      }

      $('.fixedscroll #main-menu-wrapper').perfectScrollbar('destroy');

      $('.page-sidebar.chat_shift #main-menu-wrapper .wraplist, .page-sidebar.collapseit #main-menu-wrapper .wraplist').height(height);

      /*hide sub menu of open menu item*/
      $('li.open .sub-menu').attr('style', '');
    }
  };

  mainmenuScroll = () => {
    const $ = window.$;
    //console.log("expand scroll menu");

    var topbar = $(".page-topbar").height();
    var projectinfo = $(".project-info").innerHeight();

    var height = window.innerHeight - topbar - projectinfo;

    $('.fixedscroll #main-menu-wrapper').height(height).perfectScrollbar({
        suppressScrollX: true
    });
    $("#main-menu-wrapper .wraplist").height('auto');


    /*show first sub menu of open menu item only - opened after closed*/
    // > in the selector is used to select only immediate elements and not the inner nested elements.
    $("li.open > .sub-menu").attr("style", "display:block;");
  };

  render() {
    return (
      <div>
        <ConfirmDialogContainer />
        <TopBar />
        <LeftSidebar>
          <Menu>
            <PermissionValidator allowedFor={['ADMIN', 'DISTRIBUTOR_MANAGER', 'COMPANY_MANAGER', 'SCHOOL_MANAGER']}>
              <MenuSection>
                Cadastros
              </MenuSection>
            </PermissionValidator>
            <PermissionValidator allowedFor={['ADMIN']}>
              <MenuItem title="Admin" icon="fa fa-user">
                <SubMenu
                  items={[
                    {
                      label: 'General Configuration',
                      link: '/configuration',
                    },
                    {
                      label: 'Item types',
                      link: '/item-types',
                    },
                    {
                      label: 'Placement test level',
                      link: '/placement-test-levels',
                    },
                    {
                      label: 'Courses',
                      link: '/courses',
                    },
                  ]}
                />
              </MenuItem>
            </PermissionValidator>
            <PermissionValidator allowedFor={['ADMIN']}>
              <MenuItem title="Partners" icon="fa fa-users">
                <SubMenu
                  items={[
                    {
                      label: 'Distributors',
                      link: '/distributors',
                    },
                    {
                      label: 'Companies',
                      link: '/companies',
                    },
                    {
                      label: 'Schools',
                      link: '/schools',
                    },
                  ]}
                />
              </MenuItem>
            </PermissionValidator>
            <PermissionValidator allowedFor={['ADMIN', 'DISTRIBUTOR_MANAGER', 'COMPANY_MANAGER', 'SCHOOL_MANAGER']}>
              <MenuItem title="School" icon="fa fa-graduation-cap">
                <SubMenu
                  items={[
                    {
                      label: 'Classes',
                      link: '/classes',
                    },
                    {
                      label: 'Students',
                      link: '/students',
                    },
                  ]}
                />
              </MenuItem>
            </PermissionValidator>
            <PermissionValidator allowedFor={['ADMIN']}>
              <MenuItem title="Users" icon="fa fa-user">
                <SubMenu
                  items={[
                    {
                      label: 'Company Users',
                      link: '/users',
                    },
                    {
                      label: 'Admin Users',
                      link: '/admin-users',
                    },
                    {
                      label: 'Distributor Users',
                      link: '/distributor-users',
                    },
                  ]}
                />
              </MenuItem>
            </PermissionValidator>
            <PermissionValidator allowedFor={['ADMIN', 'CONTENT_ADMIN', 'IMAGE_ADMIN']}>
              <div>
                <MenuSection>
                  Conteúdo
                </MenuSection>
                <PermissionValidator allowedFor={['ADMIN', 'CONTENT_ADMIN', 'IMAGE_ADMIN']}>
                  <MenuItem
                    title="Modules"
                    icon="fa fa-book"
                    link="/modules"
                  />
                </PermissionValidator>
                <PermissionValidator allowedFor={['ADMIN', 'CONTENT_ADMIN', 'IMAGE_ADMIN']}>
                  <MenuItem
                    title="Review"
                    icon="fa fa-eye"
                    link="/reviews"
                  />
                </PermissionValidator>
                <PermissionValidator allowedFor={['ADMIN', 'CONTENT_ADMIN', 'IMAGE_ADMIN']}>
                  <MenuItem
                    title="Placement Test"
                    icon="fa fa-pencil-square"
                    link="/placement-test"
                  />
                </PermissionValidator>
                <PermissionValidator allowedFor={['ADMIN', 'CONTENT_ADMIN', 'IMAGE_ADMIN']}>
                  <MenuItem
                    title="Practice Test"
                    icon="fa fa-book"
                    link="/practice-tests"
                  />
                </PermissionValidator>
              </div>
            </PermissionValidator>
            <PermissionValidator allowedFor={['ADMIN', 'CONTENT_ADMIN']}>
              <div>
                <MenuSection>
                  Academic
                </MenuSection>
                <PermissionValidator allowedFor={['ADMIN']}>
                  <MenuItem
                    title="Reports"
                    icon="fa fa-file-o"
                  >
                    <SubMenu
                      items={[
                        {
                          label: 'Placement Item History',
                          link: '/placement-test-items-history'
                        }
                      ]}
                    />
                  </MenuItem>
                </PermissionValidator>
                <PermissionValidator allowedFor={['ADMIN', 'CONTENT_ADMIN']}>
                  <MenuItem title="Records" icon="fa fa-list-alt">
                    <SubMenu
                      items={[
                        {
                          label: 'Classes',
                          link: '/classes-academic',
                        },
                        {
                          label: 'Students',
                          link: '/students-academic',
                        },
                      ]}
                    />
                  </MenuItem>
                </PermissionValidator>
                <PermissionValidator allowedFor={['ADMIN', 'CONTENT_ADMIN']}>
                  <MenuItem
                    title="Grades"
                    icon="fa fa-table"
                    link="/grades"
                  />
                </PermissionValidator>
              </div>
            </PermissionValidator>
          </Menu>
        </LeftSidebar>
        <MainContent>
          {this.props.children}
        </MainContent>
        <NotificationContainer />
      </div>
    );
  }
}

export default MainScene;
